// Mock API Service for Mobile Recharge Application
// This simulates a backend API using local JSON files

class MockAPI {
    constructor() {
        this.baseURL = './api/';
        this.users = [];
        this.transactions = [];
        this.plans = {};
        this.offers = [];
        this.statistics = {};
    }

    // Simulate network delay
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Load JSON data
    async loadJSON(filename) {
        try {
            const response = await fetch(this.baseURL + filename);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    // Initialize API data
    async init() {
        try {
            const [usersData, plansData, transactionsData, offersData] = await Promise.all([
                this.loadJSON('users.json'),
                this.loadJSON('plans.json'),
                this.loadJSON('transactions.json'),
                this.loadJSON('offers.json')
            ]);

            this.users = usersData?.users || [];
            this.plans = plansData || {};
            this.transactions = transactionsData?.transactions || [];
            this.statistics = transactionsData?.statistics || {};
            this.offers = offersData?.offers || [];

            console.log('✅ Mock API initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Error initializing Mock API:', error);
            return false;
        }
    }

    // ========== USER AUTHENTICATION ==========

    async login(email, password) {
        await this.delay();
        
        const user = this.users.find(u => 
            (u.email === email || u.mobile === email) && u.password === password
        );

        if (user) {
            const { password, ...userWithoutPassword } = user;
            return {
                success: true,
                data: userWithoutPassword,
                message: 'Login successful'
            };
        }

        return {
            success: false,
            message: 'Invalid email/mobile or password'
        };
    }

    async register(userData) {
        await this.delay();

        // Check if user already exists
        const existingUser = this.users.find(u => 
            u.email === userData.email || u.mobile === userData.mobile
        );

        if (existingUser) {
            return {
                success: false,
                message: 'User already exists with this email or mobile'
            };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            ...userData,
            role: 'customer',
            createdAt: new Date().toISOString(),
            isActive: true,
            walletBalance: 0
        };

        this.users.push(newUser);

        const { password, ...userWithoutPassword } = newUser;
        return {
            success: true,
            data: userWithoutPassword,
            message: 'Registration successful'
        };
    }

    async getUserProfile(userId) {
        await this.delay();

        const user = this.users.find(u => u.id === userId);
        
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return {
                success: true,
                data: userWithoutPassword
            };
        }

        return {
            success: false,
            message: 'User not found'
        };
    }

    // ========== PLANS ==========

    async getPlans(operator) {
        await this.delay();

        const operatorKey = operator.toLowerCase();
        const operatorPlans = this.plans[operatorKey];

        if (operatorPlans) {
            return {
                success: true,
                data: operatorPlans
            };
        }

        return {
            success: false,
            message: 'No plans found for this operator'
        };
    }

    async getAllPlans() {
        await this.delay();

        return {
            success: true,
            data: this.plans
        };
    }

    async getPlanById(planId) {
        await this.delay();

        for (const operator in this.plans) {
            const plan = this.plans[operator].find(p => p.id === planId);
            if (plan) {
                return {
                    success: true,
                    data: plan
                };
            }
        }

        return {
            success: false,
            message: 'Plan not found'
        };
    }

    // ========== TRANSACTIONS ==========

    async createTransaction(transactionData) {
        await this.delay();

        const newTransaction = {
            id: `TXN${String(this.transactions.length + 1).padStart(6, '0')}`,
            ...transactionData,
            status: Math.random() > 0.1 ? 'success' : 'failed', // 90% success rate
            transactionDate: new Date().toISOString(),
            cashback: transactionData.amount >= 299 ? Math.floor(transactionData.amount * 0.05) : 0
        };

        if (newTransaction.status === 'failed') {
            newTransaction.failureReason = 'Payment gateway error';
        }

        this.transactions.unshift(newTransaction);

        return {
            success: newTransaction.status === 'success',
            data: newTransaction,
            message: newTransaction.status === 'success' 
                ? 'Recharge successful!' 
                : 'Transaction failed. Please try again.'
        };
    }

    async getTransactions(userId, limit = 10) {
        await this.delay();

        let userTransactions = this.transactions;
        
        if (userId) {
            userTransactions = this.transactions.filter(t => t.userId === userId);
        }

        return {
            success: true,
            data: userTransactions.slice(0, limit)
        };
    }

    async getTransactionById(transactionId) {
        await this.delay();

        const transaction = this.transactions.find(t => t.id === transactionId);

        if (transaction) {
            return {
                success: true,
                data: transaction
            };
        }

        return {
            success: false,
            message: 'Transaction not found'
        };
    }

    // ========== OFFERS ==========

    async getOffers() {
        await this.delay();

        const activeOffers = this.offers.filter(offer => offer.isActive);

        return {
            success: true,
            data: activeOffers
        };
    }

    async applyOffer(offerCode, amount) {
        await this.delay();

        const offer = this.offers.find(o => 
            o.code === offerCode && o.isActive && amount >= o.minAmount
        );

        if (offer) {
            let discount = 0;
            
            if (offer.discountType === 'percentage') {
                discount = Math.min((amount * offer.discount) / 100, offer.maxDiscount);
            } else {
                discount = offer.discount;
            }

            return {
                success: true,
                data: {
                    offer: offer,
                    discount: discount,
                    finalAmount: amount - discount
                },
                message: 'Offer applied successfully'
            };
        }

        return {
            success: false,
            message: 'Invalid offer code or minimum amount not met'
        };
    }

    // ========== STATISTICS (Admin) ==========

    async getStatistics() {
        await this.delay();

        return {
            success: true,
            data: this.statistics
        };
    }

    async getUserStatistics(userId) {
        await this.delay();

        const userTransactions = this.transactions.filter(t => t.userId === userId);
        const successfulTxns = userTransactions.filter(t => t.status === 'success');

        const totalSpent = successfulTxns.reduce((sum, t) => sum + t.amount, 0);
        const totalCashback = successfulTxns.reduce((sum, t) => sum + (t.cashback || 0), 0);

        // Monthly spending (last 6 months)
        const monthlySpending = [600, 800, 500, 1200, 900, 700];

        // Operator distribution
        const operatorCounts = {};
        successfulTxns.forEach(t => {
            operatorCounts[t.operator] = (operatorCounts[t.operator] || 0) + 1;
        });

        return {
            success: true,
            data: {
                totalSpent,
                totalRecharges: successfulTxns.length,
                totalCashback,
                activePlans: 2,
                monthlySpending,
                operatorDistribution: operatorCounts,
                recentTransactions: userTransactions.slice(0, 5)
            }
        };
    }
}

// Create global instance
const mockAPI = new MockAPI();

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    const initialized = await mockAPI.init();
    if (initialized) {
        console.log('🚀 Mock API ready to use');
    }
});

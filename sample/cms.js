async function loadCourses() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    const list = document.getElementById("post-list");
    list.innerHTML = "";

    data.map((post, index) => {
        if (index < 15) {
            const li = document.createElement("li");
            li.innerHTML = `${post.id}. ${post.title}`;
            list.appendChild(li);
        }
    });
}



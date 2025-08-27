

function redirectSingleBlog(id) {
  window.location.href = `pages/moreblogs.html?blogId=${id}`;
}

const loader = document.getElementById("loader");
const allblog = document.getElementById("allblog");

// Show loader before fetch
loader.classList.remove("hidden");
allblog.innerHTML = '';

const apiUrl = "https://brand-backend-v2xk.onrender.com/brand/blog/gets";

fetch(apiUrl, {
  method: "GET",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((userData) => {
     loader.classList.add("hidden");
    // console.log("User Data:", userData.data);
    fillBlogs(userData.data);
  })
  .catch((error) => {
    loader.classList.add("hidden");
    // console.error("Error:", error);
     allblog.innerHTML = `
      <div class="error-message">
        <p>Failed to load blogs. Please try again later.</p>
      </div>
    `;
  });
// console.log("fetch here");

const fillBlogs = (blogs) => {
  const slicedBlogs = blogs.slice(0, 3);
  slicedBlogs.map((blog) => {
    const allblog = document.getElementById("allblog");
    allblog.innerHTML += `
      <div>
        <div><img class="portfolio-imgs" src="${blog.image}"/></div>
        <div class="sdisc">
          <h3>${blog.title}</h3>
          <p>${blog.description.slice(0,90)}...</p>
          <input type="button" value="read more" id="submit" class="sending" onclick="redirectSingleBlog('${blog._id}')">
          <span id="success"></span>
        </div>
      </div>
    `;
  });
};

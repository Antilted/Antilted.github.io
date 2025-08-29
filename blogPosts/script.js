// find grid container
const gridContainer = document.querySelector("#grid-container");

// create empty container for adding our html
let blogPostHolder = ``;

// function to run on each element of our array
function addBlogPost(item, index) {
  console.log(item);
  console.log(index);
  blogPostHolder += `
    <article> id="${item.id}>
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    </article>`;
}

// run addBlogPost on each item array
blogPosts.forEach(addBlogPost);

// set my final html
gridContainer.innerHTML = blogPostHolder;

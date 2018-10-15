// variable
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');

// Listeners
loadEventListeners();

function loadEventListeners() {
    // when new course is added
    courses.addEventListener('click', buyCourse);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart button
    clearCartBtn.addEventListener('click', clearCart);

    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

//function
function buyCourse(e) {
    e.preventDefault();
    //use delegation to find the course that was added
    if (e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}

//read the html information of selection course
function getCourseInfo(course) {
    // create an Object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // console.log(courseInfo);
    // Insert into the shopping cart
    addIntoCart(courseInfo);
}

// Display the selected course into the shopping cart

function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100 />
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // Adding into shopping cart content
    shoppingCartContent.appendChild(row);

    //add course into storage
    saveIntoStorage(course);
}

// Add Course Into localstorage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into array
    courses.push(course);

    // since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

//get the content from the storage
function getCoursesFromStorage() {

    let courses;

    // if something exist on storage then we get value, otherwise create an empty array
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// remove course from the DOM
function removeCourse(e) {
    let course, courseId;


    // remove from the DOM
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    //remove from the localstorage
    removeCourseLocalStorage(courseId);
}

//remove from localstorage
function removeCourseLocalStorage(id){
    //get the localstorage data
    let coursesLS = getCoursesFromStorage();

    // loop throught the array and find index to remove
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index,1);
        }
    });
    // console.log(coursesLS);
    //add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// clear the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //clear from localstorage
    clearLocalStorage();
}

//clear the wholes localstorage
function clearLocalStorage(){
    localStorage.clear();
}

// loaded Document is Ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // LOOP throught the courses and print into the cart
    coursesLS.forEach(function (course) {
        // create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
         <tr>
              <td>
                   <img src="${course.image}" width=100>
              </td>
              <td>${course.title}</td>
              <td>${course.price}</td>
              <td>
                   <a href="#" class="remove" data-id="${course.id}">X</a>
              </td>
         </tr>
    `;
        shoppingCartContent.appendChild(row);
    });

}
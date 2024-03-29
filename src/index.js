import Home from "./home.svg";
import sun from "./weather-sunny.svg";
import add from "./plus-circle-outline.svg";
import _ from "lodash";
import "./style.css";
import { format, isEqual, parseISO } from "date-fns";

//tests
const projects = (() => {
  if (localStorage.getItem("storage2") == undefined) {
    localStorage.setItem("storage2", JSON.stringify([]));
  }
})();

const storage = (() => {
  if (localStorage.getItem("storage") == undefined) {
    localStorage.setItem("storage", JSON.stringify([]));
  }
})();

const structure = (name = "General Tasks") => {
  if (localStorage.getItem(name) == undefined) {
    localStorage.setItem(name, JSON.stringify([]));
  }

  const topBar = document.createElement("div");
  document.body.appendChild(topBar);

  topBar.textContent = "TodoList.io";
  topBar.style.color = "whitesmoke";
  topBar.classList.add("topBar");

  const signUp = document.createElement("button");
  signUp.textContent = "Sign Up";
  signUp.classList.add("up");
  topBar.appendChild(signUp);

  const main = document.createElement("div");
  document.body.appendChild(main);
  main.classList.add("main");

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  main.appendChild(sidebar);

  const div1 = document.createElement("div");
  div1.classList.add("icons");
  sidebar.appendChild(div1);

  /*
  const all = document.createElement("button");
  all.textContent = "General Tasks";
  all.classList.add("addProject");
  sidebar.appendChild(all);
  */
  const all = new Image();
  all.classList.add("image");
  all.classList.add("image1");
  all.src = Home;
  div1.appendChild(all);

  /*
  const today = document.createElement("button");
  today.textContent = "Today";
  today.classList.add("addProject");
  sidebar.appendChild(today);
  */

  const today = new Image();
  today.classList.add("image");
  all.classList.add("image2");
  today.src = sun;
  div1.appendChild(today);

  /*
  const addProject = document.createElement("button");
  addProject.textContent = "add project";
  addProject.classList.add("addProject");
  sidebar.appendChild(addProject);
  */

  const addProject = new Image();
  addProject.classList.add("image");
  addProject.classList.add("image3");
  addProject.src = add;
  div1.appendChild(addProject);

  const projects = document.createElement("div");
  addProject.classList.add("projects");
  sidebar.appendChild(projects);

  const screen = document.createElement("div");
  main.appendChild(screen);
  screen.classList.add("screen");

  const topScreen = document.createElement("div");
  screen.appendChild(topScreen);
  topScreen.classList.add("topScreen");

  const content = document.createElement("div");
  const text = document.createElement("div");

  topScreen.appendChild(text);
  text.classList.add("contentText");
  text.textContent = name;

  const addTask = document.createElement("button");
  addTask.textContent = "+ Add";
  addTask.classList.add("addTask");

  topScreen.appendChild(addTask);
  screen.appendChild(content);
  content.classList.add("content");

  const day = format(new Date(), "yyyy-MM-dd");

  displayProjects(sidebar);
  posttoDisplay(content, name, day);

  addTask.onclick = () => {
    appearScreen(content, name);
  };

  addProject.onclick = () => {
    appearScreenProjects();
  };

  all.onclick = (event) => {
    document.body.innerHTML = "";
    event.preventDefault();
    structure();
  };

  today.onclick = (event) => {
    event.preventDefault();
    document.body.innerHTML = "";
    structure("Today");
  };
};
structure();

function appearScreen(content, name) {
  const div = document.createElement("form");
  div.classList.add("appear");
  document.body.appendChild(div);

  const title = document.createElement("input");
  title.placeholder = "title";
  title.style.width = "100%";
  div.appendChild(title);

  const description = document.createElement("textarea");
  description.cols = "100vw";
  description.rows = "10";
  description.placeholder = "description";
  div.appendChild(description);

  const date = document.createElement("input");
  date.type = "date";
  div.appendChild(date);

  const post = document.createElement("button");
  post.textContent = "post";
  div.appendChild(post);

  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  div.appendChild(cancel);

  post.onclick = (event) => {
    event.preventDefault();
    const task = taskFactory(title.value, description.value, date.value);
    posttoStorage(task, name);
    posttoDisplay(content, name);
    removeItem(document.body, div);
  };

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
  };
}

const taskFactory = (title, description, date) => {
  return { title, description, date };
};

function posttoStorage(object, name) {
  if (name !== "General Tasks") {
    const array = JSON.parse(localStorage.getItem(name));
    array.push(object);
    localStorage.setItem(name, JSON.stringify(array));
  }
  const arrayofTasks = JSON.parse(localStorage.getItem("storage"));
  arrayofTasks.push(object);
  localStorage.setItem("storage", JSON.stringify(arrayofTasks));
}

function posttoDisplay(content, name, today) {
  if (name == "General Tasks") {
    content.innerHTML = "";
    const arrayofTasks = JSON.parse(localStorage.getItem("storage"));
    for (let i = 0; i < arrayofTasks.length; i++) {
      const div = document.createElement("div");
      div.classList.add("line");
      content.appendChild(div);

      const div2 = document.createElement("div");
      div.appendChild(div2);
      div2.classList.add("line2");

      const radio = document.createElement("input");
      radio.type = "radio";
      div2.appendChild(radio);

      let title = document.createElement("p");
      title.textContent = JSON.parse(localStorage.getItem("storage"))[i].title;
      div2.appendChild(title);

      radio.onclick = () => {
        removeItem(content, div);
        radioRemove(arrayofTasks[i], name);
      };

      title.onclick = () => {
        if (
          div2.innerHTML == `<input type="radio"><p>${title.textContent}</p>`
        ) {
          showDesc(div2, JSON.parse(localStorage.getItem("storage"))[i], name);
        } else {
          document.body.innerHTML = "";
          structure(name);
        }
      };
    }
  } else if (name == "Today") {
    content.innerHTML = "";
    const arrayofTasks = JSON.parse(localStorage.getItem("storage"));

    for (let i = 0; i < arrayofTasks.length; i++) {
      const date = arrayofTasks[i].date;
      if (isEqual(parseISO(today), parseISO(date))) {
        const div = document.createElement("div");
        div.classList.add("line");
        content.appendChild(div);

        const div2 = document.createElement("div");
        div.appendChild(div2);
        div2.classList.add("line2");

        const radio = document.createElement("input");
        radio.type = "radio";
        div2.appendChild(radio);

        let title = document.createElement("p");
        title.textContent = JSON.parse(localStorage.getItem("storage"))[
          i
        ].title;
        div2.appendChild(title);

        radio.onclick = () => {
          removeItem(content, div);
          radioRemove(arrayofTasks[i]);
        };

        title.onclick = () => {
          if (
            div2.innerHTML == `<input type="radio"><p>${title.textContent}</p>`
          ) {
            showDesc(
              div2,
              JSON.parse(localStorage.getItem("storage"))[i],
              name
            );
          } else {
            document.body.innerHTML = "";
            structure(name);
          }
        };
      }
    }
  } else {
    content.innerHTML = "";
    const arrayofTasks = JSON.parse(localStorage.getItem(name));
    for (let i = 0; i < arrayofTasks.length; i++) {
      const div = document.createElement("div");
      div.classList.add("line");
      content.appendChild(div);

      const div2 = document.createElement("div");
      div.appendChild(div2);
      div2.classList.add("line2");

      const radio = document.createElement("input");
      radio.type = "radio";
      div2.appendChild(radio);

      let title = document.createElement("p");
      title.textContent = JSON.parse(localStorage.getItem(name))[i].title;

      div2.appendChild(title);

      radio.onclick = () => {
        removeItem(content, div);
        radioRemove(arrayofTasks[i], name);
      };
      title.onclick = () => {
        if (
          div2.innerHTML == `<input type="radio"><p>${title.textContent}</p>`
        ) {
          showDesc(div2, JSON.parse(localStorage.getItem("storage"))[i], name);
        } else {
          document.body.innerHTML = "";
          structure(name);
        }
      };
    }
  }
}

function showDesc(div, item, name) {
  name = "storage";
  const data = document.createElement("div");
  data.classList.add("descc");
  div.appendChild(data);

  const desc = document.createElement("textarea");
  desc.cols = "30";
  desc.rows = "10";
  desc.value = item.description;

  data.appendChild(desc);
  const array = [];

  desc.addEventListener("keyup", () => {
    const temp = JSON.parse(localStorage.getItem("storage"));
    for (let i = 0; i < temp.length; i++) {
      array.push(JSON.stringify(temp[i]));
    }
    const descript = array.indexOf(JSON.stringify(item));
    const lol = JSON.parse(localStorage.getItem("storage"));
    const set = lol[descript];
    set.description = desc.value;
    localStorage.setItem("storage", JSON.stringify(lol));

    const temp1 = JSON.parse(localStorage.getItem(name));
    for (let i = 0; i < temp1.length; i++) {
      array.push(JSON.stringify(temp1[i]));
    }
    const descript1 = array.indexOf(JSON.stringify(item));
    const set1 = lol[descript1];
    set1.description = desc.value;
    localStorage.setItem(name, JSON.stringify(lol));
  });
}

function radioRemove(item, name) {
  const arrayofAll = [];
  const temp = JSON.parse(localStorage.getItem("storage"));
  temp.forEach((element) => arrayofAll.push(JSON.stringify(element)));
  arrayofAll.splice(arrayofAll.indexOf(JSON.stringify(item)), 1);
  const final = [];
  arrayofAll.forEach((element) => final.push(JSON.parse(element)));
  localStorage.setItem("storage", JSON.stringify(final));

  if (name !== "General Tasks") {
    const arrayofAll2 = [];
    localStorage.getItem(name);
    const temp2 = JSON.parse(localStorage.getItem(name));
    temp2.forEach((element) => arrayofAll2.push(JSON.stringify(element)));
    arrayofAll2.splice(arrayofAll2.indexOf(JSON.stringify(item)), 1);
    const final2 = [];
    arrayofAll2.forEach((element) => final2.push(JSON.parse(element)));
    localStorage.setItem(name, JSON.stringify(final2));
  }
}
// for projects
const projectFactory = (name) => {
  return { name };
};

function appearScreenProjects() {
  const div = document.createElement("form");
  div.classList.add("appProject");
  document.body.appendChild(div);

  const title = document.createElement("input");
  title.placeholder = "Project title";
  title.style.width = "100%";
  div.appendChild(title);

  const post = document.createElement("button");
  post.textContent = "post";
  div.appendChild(post);

  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  div.appendChild(cancel);

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
  };

  post.onclick = (event) => {
    const project = projectFactory(title.value);
    event.preventDefault();
    posttoStoreProjects(project);
    document.body.innerHTML = "";
    structure();
  };
}

function posttoStoreProjects(project) {
  const arrayProjects = JSON.parse(localStorage.getItem("storage2"));
  arrayProjects.push(project);
  localStorage.setItem("storage2", JSON.stringify(arrayProjects));
}

function displayProjects(div) {
  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("storage2")).length;
    i++
  ) {
    const div2 = document.createElement("div");
    div.appendChild(div2);
    div2.classList.add("flexed");

    const title = document.createElement("button");
    title.innerHTML = JSON.parse(localStorage.getItem("storage2"))[i].name;
    title.style.width = "90%";
    title.classList.add("change");
    title.style.color = "whitesmoke";
    div2.appendChild(title);

    /*
    const picname = JSON.parse(localStorage.getItem("storage2"))[i].name;

    const title = new Image();
    title.classList.add("image");
    today.src = `https://source.unsplash.com/random/?${picname}`;
    sidebar.appendChild(today);
    */
    const x = document.createElement("div");
    x.textContent = "❌";
    x.classList.add("x");
    x.classList.add("change");
    x.style.width = "10%";
    div2.appendChild(x);

    title.onclick = (event) => {
      event.preventDefault();
      document.body.innerHTML = "";
      structure(title.innerHTML);
    };
    x.onclick = (event) => {
      event.preventDefault();
      removeItem(div, div2);
      xclear(JSON.parse(localStorage.getItem("storage2"))[i]);
      document.body.innerHTML = "";
      structure();
    };
  }
}

function xclear(item) {
  localStorage.removeItem(item.name);
  const arrayofAll = [];
  const temp = JSON.parse(localStorage.getItem("storage2"));
  temp.forEach((element) => arrayofAll.push(JSON.stringify(element)));
  arrayofAll.splice(arrayofAll.indexOf(JSON.stringify(item)), 1);
  const final = [];
  arrayofAll.forEach((element) => final.push(JSON.parse(element)));
  localStorage.setItem("storage2", JSON.stringify(final));
}

function removeItem(parent, child) {
  parent.removeChild(child);
}

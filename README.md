# vanilla-navi

vanilla-navi can use base Document API create a SPA application.

Gzip size: 1KB

## Install

unpkg, use last version:

```html
<script src="https://unpkg.com/vanilla-navi@6.6.6/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-navi
```

## Example

```ts
import Navi from "./vanilla-navi";

function Home() {
  const ele = document.createElement("div");

  const label = document.createElement("div");
  label.textContent = "Home page";

  const button = document.createElement("button");
  button.textContent = "go user";
  button.onclick = () => {
    // Go tu User page:
    Navi.push("/user");
  };

  ele.append(label, button);

  return ele;
}

function User() {
  const ele = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = "User page";

  const button = document.createElement("button");
  button.textContent = "back";
  button.onclick = () => {
    // Go back:
    Navi.pop();
  };

  ele.append(label, button);

  for (let index = 0; index < 50; index++) {
    const label = document.createElement("div");
    label.textContent = "User page + " + index;
    ele.append(label);
  }

  return ele;
}


// register a path and a Page Function, Page Function return a HTMLElement:
Navi.use("/home", Home);
Navi.use("/user", User);

// Setting navi start page, if input error URL, go back start page:
Navi.init("/home");

// Navi.root is all page's root element:
document.body.append(Navi.root);
```

But this page

## Use Animate Page

Create two Function, create HTMLElement box:

```ts

// Use Page(ele), can set full page:
function Page(child: HTMLElement) {
  const ele = document.createElement("div");

  ele.style.width = "100%";
  ele.style.height = "100%";
  ele.style.backgroundColor = "#fff";
  ele.style.position = "fixed";
  ele.style.top = "0px";
  ele.style.left = "0px";
  ele.style.transition = "all 0.2s ease-out";
  ele.append(child);

  return ele;
}

// AnimaPage is use Base Page create full page, and set the Base Page css animation.
function AnimaPage(child: HTMLElement) {
  const ele = Page(child);

  ele.style.opacity = "0";
  ele.style.transform = "translateY(25%)";

  // When page push:
  setTimeout(() => {
    ele.style.opacity = "1";
    ele.style.transform = "translateY(0%)";
  }, 50);

  // When page pop:
  (ele as any)._naviBeforePop = {
    // If use Navi.Pop, waiting 300ms remove this element:
    duration: 300,
    // If use Navi.Pop, do this event:
    event: () => {
      ele.style.opacity = "0";
      ele.style.transform = "translateY(25%)";
    }
  };

  return ele;
}
```

Ok, Very easy, Let me change the example:

```ts
function Home() {
  // root page did't use animation:
  return Page(ele);
}
function User() {
  ...
  // other page need use animation:
  return AnimaPage(ele);
}
```
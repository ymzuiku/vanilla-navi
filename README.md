# vanilla-navi

vanilla-navi can use base Document API create a SPA application.

Gzip size: 1KB

## Install

unpkg, use last version:

```html
<script src="https://unpkg.com/vanilla-navi@1.0.0/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-navi
```

## Example

```ts
import Navi from "./vanilla-navi";

// create Navi instantiation:
const navi = Navi();

function Home() {
  const ele = document.createElement("div");

  const label = document.createElement("div");
  label.textContent = "Home page";

  const button = document.createElement("button");
  button.textContent = "go user";
  button.onclick = () => {
    // Go tu User page:
    navi.push("/user", { kind: "It is params.kind" });
  };

  ele.append(label, button);

  return ele;
}

function User({ kind }: { kind: string }) {
  const ele = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = kind + " User page";

  const button = document.createElement("button");
  button.textContent = "back";
  button.onclick = () => {
    // Go back:
    navi.pop();
  };

  ele.append(label, button);

  for (let index = 0; index < 50; index++) {
    const label = document.createElement("div");
    label.textContent = kind + " User page + " + index;
    ele.append(label);
  }

  return ele;
}

// register a path and a Page Function, Page Function return a HTMLElement:
navi.use("/home", Home);
navi.use("/user", User);

// Setting navi start page, if input error URL, go back start page:
navi.init("/home");

// navi.root is all page's root element:
document.body.append(navi.root);
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
  ele.append(child);

  return ele;
}

// AnimaPage is use Base Page create full page, and set the Base Page css animation.
function AnimaPage(child: HTMLElement) {
  const ele = Page(child);

  ele.style.opacity = "0";
  ele.style.transform = "translateY(12%)";
  ele.style.transition = "all 0.18s ease-in";

  // When page push:
  setTimeout(() => {
    ele.style.opacity = "1";
    ele.style.transform = "translateY(0%)";
    ele.style.transition = "all 0.17s ease-out";
  }, 50);

  // When page pop:
  (ele as any)._naviBeforePop = {
    // If use navi.Pop, waiting 300ms remove this element:
    duration: 300,
    // If use navi.Pop, do this event:
    event: () => {
      ele.style.opacity = "0";
      ele.style.transform = "translateY(12%)";
      ele.style.transition = "all 0.18s ease-in";
    }
  };

  return ele;
}
```

Ok, Very easy, Let me change the example:

```ts
function Home() {
  ...
  // root page did't use animation:
  return Page(ele);
}
function User({ kind }: { kind: string }) {
  ...
  // other page need use animation:
  return AnimaPage(ele);
}
```

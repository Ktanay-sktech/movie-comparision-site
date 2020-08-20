const autocomplete = ({ root,renderOption,onOptionSelect ,inputvalue,fetch}) => {
  root.innerHTML = `
<label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results">

        </div>
      </div>
    </div>
`;
  const dropdown = root.querySelector(".dropdown");
  const input = root.querySelector("input");
  const resultsrapper = root.querySelector(".results");

  /*oninput*/
  const oninput = async (event) => {
    const items = await fetch(event.target.value);
    if (!(items.length)) {
      dropdown.classList.remove("is-active");
      return;
    }
    resultsrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
     
      option.classList.add("dropdown-item");
      option.innerHTML =renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputvalue(item);
        onOptionSelect(item)
      });
      resultsrapper.appendChild(option);
    }
  };
  /*------------------------------ */
  input.addEventListener("input", debounce(oninput, 1000));
  /*clicking outside closes dropdown*/
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
  /*------------ */
};

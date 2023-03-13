

export function onSearch(cb) {
    document.getElementById('SearchBar').addEventListener("input", function handleChange(e) {
        setTimeout(() => { cb(e.target.value) }, 300);
    })
}

export function onFilterChange(cb) {
    const RegionFiltered = document.getElementById('RegionFiltered');

    document.getElementById('DropMenu').addEventListener("click", function handleChange(e) {
        let filter = e.target.text;
        // console.log(e.target.data('value'))
        // console.log(this.data("value"))
        filter == "No Filter" ? RegionFiltered.innerHTML = "Filter by" : RegionFiltered.innerHTML = filter;
        cb(filter);
    });
}

export function onDrop(cb) {
    let favList = document.getElementById('FavList');

    favList.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    favList.addEventListener("drop", (e) => {
        e.preventDefault();
        let id_dropped = e.dataTransfer.getData("text");
        cb(id_dropped)
    })
}

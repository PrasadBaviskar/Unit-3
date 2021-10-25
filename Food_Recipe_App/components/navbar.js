function navbar(){
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">Food Receipe App</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="Recipe_Of_the_Day.html">Recipe Of the Day</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="latest_receipe.html">Latest Receipe</a>
              </li>
            </ul>
            <form class="d-flex">
              <input id="keyword" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button id="search_btn" class="btn btn-outline-success" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>`
}

export default navbar




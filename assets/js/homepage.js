var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/"+ user + "/repos";

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
    // request was successful
    if (response.ok){
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    }else {
        alert("Error: GitHub User Not Found");
    }
    })
    .catch(function(error) {
        //Notice this '.catch' getting chained onto the end of the 'then()'
        alert("Unable to connect to GitHUb");
    });
}

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input form
    var username = nameInputEl.value.trim();
    
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }else {
        alert("Please enter a GitHub username");
    }

};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

     // clear old content
     repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i= 0; i < repos.length; i++) {
        // formate repo name
        var repoName = repos[i].owner.login = "/" +repos[i].name;

        //create a container for each repo
        var repoEl =document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEL = document.createElement("span");
        titleEL.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEL);

        // create a status element
      var statusEL = document.createElement("span");
      statusEL.classList = "flex-row align-center";
  
      // check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
          statusEL.innerHTML = 
              "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
          } else {
            statusEL.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
          
      }
  
      //append to container
      repoEl.appendChild(statusEL);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
      
}
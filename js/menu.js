var menu = document.querySelector("#Menu");


menu.innerHTML = `   <nav class="navbar navbar-expand-lg py-3 bg-dark navbar-dark">
<div class="container ">
    <a class="navbar-brand img-fluid" href="/"><img src="img/AvatarMaker.png" alt=""></a>
    <button class=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
    </button>
    <div class="collapse navbar-collapse text-uppercase" id="navbarNav">

        <ul class="navbar-nav mx-auto">

            <li class=" nav-item">
                <a class="nav-link" href="index.html">List</a>
            </li>
            <li class=" nav-item">
                <a class="nav-link" href="createStudent.html">Create Student</a>
            </li>

        </ul>

        <div class="d-flex ">
            <a class=" nav-icons" href="https://www.linkedin.com/in/dagoberto-salas-cordero-10205521b/"
                target="_blank">
                <i class="fab fa-linkedin text-light"></i>
            </a>
            <a class="nav-icons" href="https://github.com/Dago04" target="_blank">
                <i class="fab fa-github text-light"></i>
            </a>
        </div>
    </div>

</div>
</nav> `
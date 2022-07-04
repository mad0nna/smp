<nav class="d-flex flex-column shadow">
    <div class="d-flex justify-content-between bg-header min-h padding-x padding-y">
        <div>
            <div class="mx-auto">
                <h3 class="text-xs text-body-600 mb-0">sprobe admin 様</h3>
                <h3 class="text-xs text-body-600 mb-0">Sprobe （閲覧用）</h3>
            </div>
        </div>
        <div class="d-flex flex-column justify-content-center">
            <div class="position-relative">
                <p class="d-inline user-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.762 18.762" class="w-5 h-5 mr-2 inline text-primaryBg">
                        <g id="question-circle" transform="translate(0 0.631)">
                            <path d="M9.381,17.589A8.208,8.208,0,1,0,1.173,9.381,8.208,8.208,0,0,0,9.381,17.589Zm0,1.173A9.381,9.381,0,1,0,0,9.381,9.381,9.381,0,0,0,9.381,18.762Z" transform="translate(0 -0.631)" fill="#1E9E47" fill-rule="evenodd"></path>
                            <path id="Path_3627" data-name="Path 3627" d="M11.813,10.7h1.673A1.524,1.524,0,0,1,15.21,9.158c.868,0,1.664.383,1.664,1.3,0,.71-.474,1.036-1.223,1.532a2.514,2.514,0,0,0-1.481,2.22l.009.517h1.657v-.4c0-.8.346-1.036,1.28-1.66a2.712,2.712,0,0,0,1.577-2.3c0-1.688-1.618-2.5-3.388-2.5-1.681,0-3.532.723-3.491,2.83Zm1.98,6.162a1.141,1.141,0,0,0,1.28,1.036c.772,0,1.3-.44,1.3-1.036,0-.617-.532-1.05-1.3-1.05a1.138,1.138,0,0,0-1.279,1.05Z" transform="translate(-5.872 -4.138)" fill="#1e9e47"></path>
                        </g>
                    </svg>
                    <span class="text-tertiary-400">ヘルプ</span>
                </p>
                <button id="dropdown-action" class="border border-0 padding-0" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.944" class="w-5 h-5">
                        <path id="account-circle" d="M12,.25a11.563,11.563,0,0,1,8.487,3.513A11.531,11.531,0,0,1,24,12.222a11.531,11.531,0,0,1-3.513,8.459A11.563,11.563,0,0,1,12,24.194a11.563,11.563,0,0,1-8.487-3.513A11.533,11.533,0,0,1,0,12.222,11.527,11.527,0,0,1,3.513,3.763,11.565,11.565,0,0,1,12,.25Zm0,3.6a3.536,3.536,0,0,0-2.558,1.04A3.4,3.4,0,0,0,8.375,7.416,3.491,3.491,0,0,0,9.443,9.974,3.486,3.486,0,0,0,12,11.042,3.4,3.4,0,0,0,14.53,9.974a3.538,3.538,0,0,0,1.04-2.558A3.551,3.551,0,0,0,12,3.847Zm0,17.031a8.345,8.345,0,0,0,4.1-1.04A8.572,8.572,0,0,0,19.167,17a2.438,2.438,0,0,0-1.321-2,9.81,9.81,0,0,0-2.923-1.293A11.53,11.53,0,0,0,12,13.29a11.611,11.611,0,0,0-2.923.422A9.765,9.765,0,0,0,6.156,15a2.612,2.612,0,0,0-1.379,2A8.61,8.61,0,0,0,12,20.878Z" transform="translate(0 -0.25)" fill="#1e9e47"/>
                    </svg>
                </button>
                <ul class="dropdown-menu list-unstyled" aria-labelledby="dropdown-action" data-bs-popper="none">
                    <li>
                        <a class="dropdown-item" href="/logout">ログアウト</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row min-h padding-x padding-y">
        <div class="col-2 logo-container">
            <img alt="Kot Logo - SM" class="auto-h min-w d-none d-md-block" src="/images/KOT-menu-logo.png">
            <img alt="Kot Logo - XS" class="auto-h w-icon d-block d-md-none" src="/images/king-of-time-logo.png">
        </div>
        <div class="col-10 d-flex d-md-none justify-content-end">
            <button onClick="toggle()" class="border border-0 padding-0 bg-transparent">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <div id="menu" class="col-12 col-md-10 d-none d-md-flex justify-content-end">
            <ul class="list-unstyled d-md-flex my-auto text-align-right">
                <li class="ml-20 d-block min-h-22px">
                    <a href="/admin/dashboard" class="text-decorate-none text-body-400">ダッシュボード</a>
                </li>
                <li class="ml-20 d-block min-h-22px">
                    <a href="/admin/accounts" class="text-decorate-none text-body-400">アカウント</a>
                </li>
                <li class="ml-20 d-block min-h-22px">
                    <a href="#" class="text-decorate-none text-body-400">ショップ</a>
                </li>
                <li class="ml-20 d-block min-h-22px">
                    <a href="#" class="text-decorate-none text-body-400">
                        <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" width="22.868" height="22.868" viewBox="0 0 22.868 22.868">
                            <path id="Settings_Icon" data-name="Settings Icon" d="M13.442,1.5a2.094,2.094,0,0,0-4.016,0l-.143.486A2.092,2.092,0,0,1,6.274,3.233L5.831,2.99a2.094,2.094,0,0,0-2.84,2.84l.241.445A2.092,2.092,0,0,1,1.986,9.283L1.5,9.426a2.094,2.094,0,0,0,0,4.016l.486.143a2.092,2.092,0,0,1,1.246,3.008l-.243.443a2.094,2.094,0,0,0,2.84,2.84l.445-.241a2.092,2.092,0,0,1,3.008,1.246l.143.486a2.094,2.094,0,0,0,4.016,0l.143-.486a2.092,2.092,0,0,1,3.008-1.246l.443.243a2.094,2.094,0,0,0,2.84-2.84l-.241-.445a2.092,2.092,0,0,1,1.246-3.008l.486-.143a2.094,2.094,0,0,0,0-4.016l-.486-.143a2.092,2.092,0,0,1-1.246-3.008l.243-.443a2.094,2.094,0,0,0-2.84-2.84l-.445.241a2.092,2.092,0,0,1-3.008-1.246L13.442,1.5ZM11.434,15.622a4.188,4.188,0,1,0-4.186-4.189,4.188,4.188,0,0,0,4.186,4.189Z" transform="translate(0.001 0)" fill="#757575" fill-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<script>
    const nav = document.querySelector('#menu');

    const toggle = () => {
        if (nav.classList.contains('d-none')) {
            nav.classList.remove('d-none')
        } else {
            nav.classList.add('d-none')
        }
    }
</script>

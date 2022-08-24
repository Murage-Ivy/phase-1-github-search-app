document.addEventListener('DOMContentLoaded', () => {
    getUser();

})

function getUser() {
    const form = document.querySelector('#github-form');
    const container = document.querySelector('#github-container');
    const ul = document.querySelector('#user-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#search');
        let value = input.value;
        return fetch(`https://api.github.com/search/users?q=${value}`, {
                headers: {
                    'accept': 'application/vnd.github.v3+json'
                }
            })
            .then(res => res.json())
            .then(users => users.items.forEach(user => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                const h2 = document.createElement('h2');
                const a = document.createElement('a');
                a.textContent = 'GitHub Link'
                a.setAttribute('href', `${user.html_url}`)
                h2.textContent = `${user.login}`;
                img.src = `${user.avatar_url}`;
                li.appendChild(img);
                li.appendChild(a)
                ul.appendChild(h2)
                ul.appendChild(li);
                ul.innerHTML = ''


                li.addEventListener('click', (e) => {
                    fetch(`https://api.github.com/users/${value}/repos`)
                        .then(res => res.json())
                        .then(repos => {
                            console.log(repos);
                            repos.forEach(repo => {
                                    const ulRepo = document.createElement('ul');
                                    ulRepo.className = 'card';
                                    ulRepo.innerHTML = `<li>
                                                    <h5>${repo.name}</h5>
                                                    </li>`;
                                    e.target.appendChild(ulRepo);
                                })
                                .catch(error => {
                                    ulRepo.innerHTML = `<li>
                                <h5>${error.message}</h5>
                                </li>`
                                })
                        });


                })

                e.target.reset();
            }));

    })

}
export function scraper() {
    let input = document.getElementById('keyword');
    input.addEventListener("change", (e) => {
        let key = e.target.value;
        return fetch('/api  ', {
            method: 'post',
            body: key,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(()=>console.log('updated!!!'));
    });
    let checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}

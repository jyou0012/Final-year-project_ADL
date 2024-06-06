
(async() => {
const username = process.argv[2]
const password = process.argv[3]
const res = await fetch("http://127.0.0.1:3000/api/staff", {
	method: "POST",
	body: JSON.stringify({username: username, password: password})
})
console.log(await res.text())
})();


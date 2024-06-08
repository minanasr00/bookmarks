var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
var sumButton = document.getElementById("submitBtn")
var inputs = Array.from(document.querySelectorAll("input"))
var closeBtn = document.getElementById("closeBtn")
var boxContainer = document.getElementById("lightBoxContainer")
var regex = {
    bookmarkName: /^\w{3,}$/,
    bookmarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
}
if (localStorage.getItem("url")==null) {
    var bookMarks = []
} else {
    var bookMarks = JSON.parse(localStorage.getItem("url"))
    display()
}
sumButton.addEventListener("click", function () {
    if (siteName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid")) {
        var sites = {
            sName: siteName.value,
            sUrl: siteUrl.value,
        }
        bookMarks.push(sites)
        localStorage.setItem("url", JSON.stringify(bookMarks))
        siteName.value = null
        siteUrl.value = null
        display()
    } else {
        boxContainer.classList.replace("d-none","d-flex")
    }
})
function display() {
    var holder = ""
    for (let i = 0; i < bookMarks.length; i++) {
        holder +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookMarks[i].sName}</td>
        <td><button onclick="visit(${i})" type="button"  class="btn btn-success fs-6"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
        <td><button onclick="Delete(${i})" type="button"  class="btn btn-danger"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
        </tr>
        `
    }
        document.getElementById("tableBody").innerHTML= holder
}

function visit(i) {
    if (bookMarks[i].sUrl.includes("https://")) {
        window.open(`${bookMarks[i].sUrl}`, "_blank")
    }else if (bookMarks[i].sUrl.includes("www")) {
        window.open(`https://${bookMarks[i].sUrl}`, "_blank")
    } else {
        window.open(`https://www.${bookMarks[i].sUrl}`, "_blank")
    }
    
}
function Delete(deleteIndex) {
    bookMarks.splice(deleteIndex, 1)
    localStorage.setItem("url", JSON.stringify(bookMarks))
    display()
}
for (let i = 0; i < inputs.length; i++) {       //inputs validation
    inputs[i].addEventListener("input", function (e) {
        var regId = e.target.id
        if (regex[regId].test(e.target.value)) {
            e.target.classList.add("is-valid")
            e.target.classList.remove("is-invalid")
            } else {
                e.target.classList.add("is-invalid")
                e.target.classList.remove("is-valid")
            }    

        })
    
}

closeBtn.addEventListener("click", function (e) {
    boxContainer.classList.replace("d-flex","d-none")
})


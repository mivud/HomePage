const data = {
    "fullName": 'Minh D. Vu',
    "jobDescription": 'Fullstack Developer',
    "birthYear": 1990,
    "address": 'Ho Chi Minh City, Viet Nam',
    "email": 'vd.minh@outlook.com',
    "phone": '+84 906 792 790',
    "homePage": 'https://hnim.info',
    "dotnetFromYear": 2020,
    "retailFromYear": 2015,
    "retailOprFromYear": 2018,
    "helpdeskFromYear": 2012,
}

const hostname = window.location.hostname;
const currentYear = new Date().getFullYear();

function setValueByClassName(className, value) {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(function (element) {
        element.innerHTML = value;
    });
}

function setHrefByClassName(className, href) {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(function (element) {
        element.href = href;
    });
}

setValueByClassName('fullname', data.fullName);
setValueByClassName('job-description', data.jobDescription);
setValueByClassName('email', data.email);
setValueByClassName('phone', data.phone);
setValueByClassName('address', data.address);
setValueByClassName('birth-year', data.birthYear);
setValueByClassName('homePage', data.homePage);

setValueByClassName('dotnet-years', currentYear - data.dotnetFromYear + 1);
setValueByClassName('retail-years', currentYear - data.retailFromYear + 1);
setValueByClassName('retail-ops-years', currentYear - data.retailOprFromYear + 1);
setValueByClassName('helpdesk-from', data.helpdeskFromYear);
setValueByClassName('copyright-year', currentYear);

setHrefByClassName('linkedin-link', 'https://www.linkedin.com/in/hnimuv');
setHrefByClassName('instagram-link', 'https://www.instagram.com/mivu.ins');
setHrefByClassName('github-link', 'https://github.com/mivud');
setHrefByClassName('mail-to', 'mailto:' + data.email);
setHrefByClassName('tel-to', 'tel:' + data.phone);

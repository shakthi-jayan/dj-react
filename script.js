// var, let and const 

// asynchorous -> synchorous -> sync 
// async and await 
// Prosmise 


async function getUserData() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/students/');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUserData()
//ej1
let input = {
    title: "javascript course",
    description: "basic javascript course",
    hours: 80,
    schedule: {
      module1: "basic javascript",
      module2: "javascript in the browser"
    }
  };
  
let result;
const foo1 = (inputValue) => {
    return{
        title: inputValue["title"],
        description: inputValue["description"]
    };
  };
  
result= foo1(input)
console.log(result);


//ej2
  // code your function here and equal that function to the result variable
const result2 = (inputValue, plus) => {
    inputValue.hours = inputValue.hours + plus
    return inputValue
}

const input2 = {
    title: 'javascript course',
    description: 'basic javascript course',
    hours: 80,
    schedule: {
      module1: 'basic javascript',
      module2: 'javascript in the browser'
    }
};  
  // test your code
console.log(result2(input2, 100));


//ej3
const reverse = (inputValue) =>{
    return inputValue.split(" ").reverse().join(" ");
}
const input3 = 'George Raymond Richard Martin';
console.log(reverse(input3)); // 'Martin Richard Raymond George'


//ej4
const getInitials = (inputValue) => {
    return inputValue.split(" ").map((item) => {return item[0]}).join("")
}

const input4= 'George Raymond Richard Martin';
console.log(getInitials(input4)); // GRRM


//ej5
const evenStudentsMap = (inputValue) => {
    let even = []
    inputValue.map((item) => {if(item.students %2 == 0){ even.push(item)}})
    return even
}

const evenStudentsFilter = (inputValue) => {
    return inputValue.filter((item) => {return item.students %2 === 0})
}
const input5 = [
    {
      students: 40,
      module: 'python',
    },
    {
      students: 33,
      module: 'git',
    },
    {
      students: 20,
      module: 'js'
    },
    {
      students: 11,
      module: 'agile'
    },
]
  
console.log(evenStudentsMap(input5))
console.log(evenStudentsFilter(input5))

input5.map((item) => {item.module = item.module.toUpperCase()})
console.log(input5)
let display = [] 
input5.map((item) => {display.push([item.students, item.module].join("-"))})
console.log(display)
  // code your filter here
  
  // this must return
  // [
  //   {
  //     students: 40,
  //     module: 'python',
  //   },
  //   {
  //     students: 20,
  //     module: 'js'
  //   },
  // ]
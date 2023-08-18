
const isArray = (parameter) => {
    return Array.isArray(parameter);
} 

const isObject = (parameter) => {
    return typeof parameter === 'object';
}

const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`) 
}

const deepCopy = (parameter) => {
    let copyObject;

    const paramIsObject = isObject(parameter);
    const paramIsArray = isArray(parameter);

    if(paramIsArray) {
        copyObject = [];
    } else if (paramIsObject) {
        copyObject = {};
    } else {
        return copyObject
    }

    for (key in parameter) {
        const keyParameter = isObject(parameter[key]);

        if (keyParameter) {
            copyObject[key] = deepCopy(parameter[key]); 
        } else {
            if (paramIsArray) {
                copyObject.push(parameter[key]);
            } else {
                copyObject[key] = parameter[key];
            }
        }
    }

    return copyObject
}


function SuperObject () {}
SuperObject.isArray = function (parameter) {
    return Array.isArray(parameter);
} 
SuperObject.isObject = function (parameter) {
    return typeof parameter === 'object';
}
SuperObject.deepCopy = function (parameter)  {
    let copyObject;

    const paramIsObject = isObject(parameter);
    const paramIsArray = isArray(parameter);

    if(paramIsArray) {
        copyObject = [];
    } else if (paramIsObject) {
        copyObject = {};
    } else {
        return copyObject
    }

    for (key in parameter) {
        const keyParameter = isObject(parameter[key]);

        if (keyParameter) {
            copyObject[key] = deepCopy(parameter[key]); 
        } else {
            if (paramIsArray) {
                copyObject.push(parameter[key]);
            } else {
                copyObject[key] = parameter[key];
            }
        }
    }

    return copyObject
}

function LearningPath({
    name = required('name'),
    courses = []
}) {

    this.name = name;
    this.courses = courses;
}

function Student({
    name = required(name),
    age,
    email = required(email),
    instagram,
    facebook,
    twitter,
    learningPaths = [],
    approvedCourses = [],
} = {}) {

    this.name = name;
    this.age = age;
    this.email = email;
    this.socialMedia = {
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
    };
    this.learningPaths = learningPaths;
    this.approvedCourses = approvedCourses;

    const private = {
        '_learningPaths': [],
    }
   
    Object.defineProperty(this, 'learningPaths', {  //// en este bloque fue donde se creo el this.learningPaths, es por eso que en el ciclo for cuando llama a learningpaths para iterar, se regresa al setter, porque apunta a esa referencia
        get () {
            return private['_learningPaths'];
        },
        set (newLP) {
            if (newLP instanceof LearningPath) {
                private['_learningPaths'].push(newLP)
            } else {
                console.warn('algun LearningPath no es una instancia de LearningPath Madre');
            }
        }
    });

    for(let key in learningPaths) {
        this.learningPaths = learningPaths[key]
    }
}

const escueladeVDGS = new LearningPath({name: 'Escuela de Videojuegos', courses: ['Programacion Basica', 'JavaScript']})
const escueladeDesarolloWeb = new LearningPath({name: 'Escuela de Desarollo Web', courses: ['Maquetacion con HTML', 'JavaScript']})
const juan = new Student({name:'ariel', email: 'arieldelgrande@hotmail.com', learningPaths: [escueladeVDGS, escueladeDesarolloWeb]});
console.log(juan);
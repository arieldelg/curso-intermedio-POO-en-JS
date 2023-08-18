const juan = {
    name: 'juanito',
    age: 28,
    approvedCourses: ['Curso 1'],
    addCourse (newCourse) {
        console.log('this', this);
        console.log('this.approvedCourses', this.approvedCourses);
        this.approvedCourses.push(newCourse);
    }
}

console.log(Object.keys(juan));
console.log(Object.getOwnPropertyNames(juan));
console.log(Object.entries(juan));
console.log(Object.getOwnPropertyDescriptors(juan));


Object.defineProperty(juan, 'pruebadelaNASA', {
    value: 'extraterreste',
    enumerable: false,
    writable: false,
    configurable: false,
});

Object.defineProperty(juan, 'navigator', {
    value: 'chrome',
    enumerable: false, // no sale en Object.keys
    writable: true,
    configurable: true,
});

Object.defineProperty(juan, 'editor', {
    value: 'VSCode',
    enumerable: true,
    writable: false, // no deja modificar valor
    configurable: true,
});

Object.defineProperty(juan, 'terminal', {
    value: 'WSL',
    enumerable: true,
    writable: true,
    configurable: false, //no deja borrar
}); 

Object.seal(juan); // no se puede eliminar pero si editar
Object.freeze(juan); //no se puede editar ni eliminar

Object.isSealed(); // revisa si todas las propiedades tiene seal
Object.isFrozen(); // revisa si todas las propiedades tienen frozen

const obj3 = Object.assign({}, obj1); // para crear objetos, pero no funciona con objetos dentro de objetos
const obj4 = Object.create(obj1); // hace una copia, pero si se cambia el objeto madre se afecta la copia, si se cambia la copia no se afecta el objeto madre, pero no funciona con objetos dentro de objetos

// funcionan muy bien con objetos complejos, pero no funciona con metodos de objetos
const stringObject = JSON.stringify(obj1); // convierte objeto en un string
const obj5 = JSON.parse(stringObject) // convierte el string en objeto

// CREANDO ONJETOS CON CICLOS FOR
const obj2 = {}

for (prop in obj1) {
    obj2[prop] = obj1[prop]
}

// EJERCICIOS CON RECURSIVIDAD

// Recursividad formato
/* 
const recursividad = (parametro) => {
    if (validar) {
        recursividad
    } else {
       break
    }
} 
*/

const numeros = [1,2,3,5,4,6,7,8,9,10]

const recursividad = (parametro) => {
    if(parametro.length !== 0) {
        const numero2 = numeros[0]
        numeros.shift()
        console.log(numero2)
        recursividad(parametro)
    } else {
        console.log('se termino la recursividad')
    }
}

recursividad(numeros);
console.log(numeros);

// CREANDO UNA COPIA DEL OBJETO Y APLICANDO EL OBJECT FREEZE  

 const isObject = (obj) => {
    return typeof obj === 'object';
  }
  
  const isArray = (obj) => {
    return Array.isArray(obj)
  }
  
function deepFreeze(obj) {
    let copyObject;
    
    const objIsObject = isObject(obj);
    const objIsArray = isArray(obj);
  
    if (objIsArray) {
      copyObject = [];
    } else if (objIsObject) {
      copyObject = {};
    } else {
      return copyObject
    }
    
    for (key in obj) {
      const keyObj = isObject(obj[key]);
  
      if (keyObj) {
        
        copyObject[key] = deepFreeze(obj[key])
        
      } else {
        if (objIsArray) {
          copyObject.push(obj[key]);
        } else {
            copyObject[key] = obj[key]
        }
      }
    }
  
    return Object.freeze(copyObject)
  } 



const obj6 = {
    "name":"Juanito",
    "approvedCourses":["Curso 1","Curso 2"],
    "caracteristicas":{
        "age":18,
        "colorCabello":"Negro",
        "gustos":{
            "musica":["rock","punk","ska"],
            "peliculas":["drama","horros","comedia"]
        }
    }
}


const obj7 = deepFreeze(obj6)
console.log(obj7)
console.log(obj7.caracteristicas.gustos)
console.log(Object.getOwnPropertyDescriptors(obj7))


if (typeof obj6 === 'object') {
    Object.freeze(obj6)
}

console.log(Object.getOwnPropertyDescriptors(obj6))


// ABSTRACCION CON OBJETOS LITERALES Y DEEP COPY

/* 
const isObject = (parameter) => {
    return typeof parameter === 'object';
}

const isArray = (parameter) => {
    return Array.isArray(parameter);
} 
*/

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

const studentBase = {
    name: undefined,
    age: undefined,
    email: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: {
        instagram: undefined,
        facebook: undefined,
        twitter: undefined,
    },
};


const juan = deepCopy(studentBase)
Object.seal(juan)

// Metodo para tirar error dentro de una funcion

/*
const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`)  // <---
}
*/

// MODILE PATTERN Y NAMESPACES

const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`) 
}

const baseStudent = ({
    name = required(name),
    age,
    email = required(email),
    instagram,
    facebook,
    twitter,
    learningPaths = [],
    approvedCourses = [],
} = {}) => {

    const private = {
        '_name': name,
    }

    const public = {
        age,
        email,
        socialMedia: {
            instagram,
            facebook,
            twitter,
        },
        learningPaths,
        approvedCourses,

        getName () {
            return private['_name'];
        },

        changeName (nuevoNombre1) {
            private['_name'] = nuevoNombre1;
        },
    }

    Object.defineProperty(public, 'getName', {
        configurable: false
    })

    Object.defineProperty(public, 'changeName', {
        configurable: false
    })

    return public

}

const juan = baseStudent({name:'ariel', email: 'arieldelgrande@hotmail.com'});
console.log(juan);

// DUCK TYPING 

/*
const isArray = (parameter) => {
    return Array.isArray(parameter);
} 

const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`) 
}

const createLearningPath = ({
    name = required('name'),
    courses = []
}) => {
    const private = {
        '_name': name,
        '_courses': courses
    }
    
    const public = {
        get name () {
            return private['_name']
        },

        set name (newName) {
            if (newName.length > 1) {
                private['_name'] = newName
            } else {
                console.warn('El nombre debe tener mas de 1 caractere');
            }
        },

        get courses () {
            return private['_courses']
        },
    }
    return public 
}


const baseStudent = ({
    name = required(name),
    age,
    email = required(email),
    instagram,
    facebook,
    twitter,
    learningPaths = [],
    approvedCourses = [],
} = {}) => {

    const private = {
        '_name': name,
        '_learningPaths': learningPaths
    }

    const public = {
        age,
        email,
        socialMedia: {
            instagram,
            facebook,
            twitter,
        },
        approvedCourses,

        get name () {
            return private['_name']
        },

        set name (newName) {
            if (newName.length > 1) {
                private['_name'] = newName
            } else {
                console.warn('El nombre debe tener mas de 1 caractere');
            }
        },

        get learningPaths () {
            return private['_learningPaths']
        },

        set learningPaths (newName) {

            if (!newName.name) {
                console.warn('Tu LP no tiene nombre');
                return
            }

            if (!newName.courses) {
                console.warn('Tu LP no tine courses');
                return
            }

            if (!isArray(newName.courses)){
                console.warn('Tu learningPath no es una lista');
                return
            }
            private['_learningPaths'].push(newName)  
        }
    }


    return public

}

const juan = baseStudent({name:'ariel', email: 'arieldelgrande@hotmail.com'});
console.log(juan);
*/

// INSTANCEOF EN JS

/*
const isArray = (parameter) => {
    return Array.isArray(parameter);
} 

const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`) 
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
   
    if (isArray(learningPaths)) {
        
      this.learningPaths = [] // se tiene que agregar este codigo para resetear el learning path y cuente desde cero, si no se hace, te checara si son isntancias y te las duplicara, si te checara que el impostor no es instancia del Prototipo LearningPath y no se agregara, pero aun asi se duplicara las que si son instancias

        for (let key in learningPaths) {

            if (learningPaths[key] instanceof LearningPath) {
                this.learningPaths.push(learningPaths[key])
            }
        }
    }

}
const escueladeVDGS = new LearningPath({name: 'Escuela de Videojuegos', courses: ['Programacion Basica', 'JavaScript']})
const escueladeDesarolloWeb = new LearningPath({name: 'Escuela de Desarollo Web', courses: ['Maquetacion con HTML', 'JavaScript']})
const juan = new Student({name:'ariel', email: 'arieldelgrande@hotmail.com', learningPaths: [escueladeVDGS, escueladeDesarolloWeb, {name: 'airel', courses: ['mamaHuevos']}]});
console.log(juan);
*/

// ATRIBUTOS Y METODOS PRIVADOS EN PROTOTIPOS

/*
const isArray = (parameter) => {
    return Array.isArray(parameter);
} 

const required = (parameter) => {
    throw new Error(`${parameter} este requisito es obligatorio`) 
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
*/
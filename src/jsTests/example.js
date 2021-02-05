


const person = {

    name: 'Ashot',
    surname: 'AshHeb',
    age: 21,
    getFullName: function () {
        const name = getName.apply(this);
        console.log('Name', name);

        function getName() {
            return this.name;
        }

        const getLastName = () => {
            return this.surname;
                
        }

        const surname = getLastName();
        console.log('surname' ,surname);
    }

}

person.getFullName();


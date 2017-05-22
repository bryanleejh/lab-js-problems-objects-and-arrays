  // Customer Object
  var Customer = function (customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.carRented = null;
  };

  // Car Object
  var Car = function (carInfo) {
    this.id = carInfo.id;
    this.producer = carInfo.producer;
    this.model = carInfo.model;
    this.rentalPrice = carInfo.rentalPrice;
    this.available = true;
    this.customer = null;
    this.rentalDuration = 0;
    this.quotePrice = function(rentalDuration) {
      return rentalDuration * this.rentalPrice;
    };

    this.reserve = function(customer, rentalDuration) {
      if (this.available == true) {
        this.available = false;
        this.customer = customer;
        this.rentalDuration = rentalDuration;
        return true;
      } else {
        return false;
      }
    };

    this.return = function() {
      if (this.available == true) {
        return "Sorry, this car have already been returned.";
      } else {
        this.available = true;
        this.customer = null;
        this.rentalDuration = null;
      }
    }
  };  

  // Vendor Object
  var Vendor = function(name) {
    this.name = name;
    this.cars = [];
    this.customers = [];

    this.findCarIndex = function (carID) {
      return this.cars.findIndex(function(car){
        return car.id === carID ? true : false ;
      });
    };

    this.findCustomerIndex = function (customerID) {
      return this.customers.findIndex(function(customer){
        return customer.id === customerID ? true : false ;
      });
    };

    this.getCar = function (carID) {
      return this.cars.find(function(car){
        return car.id === carID ? true : false ;
      });
    };

    this.getCustomer = function (customerID) {
      return this.customers.find(function(customer){
        return customer.id === customerID ? true : false ;
      });
    };

    this.addCar = function (carObj) {
      if (this.getCar(carObj.id)!=undefined) {
        console.log("ID already exists");
      } else {
        this.cars.push(carObj);
        console.log("Car added to warehouse");
      }
    };

    this.addCustomer = function (customerObj) {
      if (this.getCustomer(customerObj.id)!=undefined) {
        console.log("ID already exists");
      } else {
        this.customers.push(customerObj);
        console.log("Customer added to warehouse");
      }
    };

    this.removeCar = function (carID) {
      var carIndex = this.findCarIndex(carID);
      if (carIndex >= 0) {
        this.cars.splice(carIndex, 1);
        console.log("Car deleted");
      } else {
        console.log( "The carID could not be found.");
      }
    };

    this.removeCustormer = function (customerID) {
      var customerIndex = this.findCustomerIndex(customerID);
      if (customerIndex >= 0) {
        this.customers.splice(customerIndex, 1);
        console.log("Customer deleted");
      } else {
        console.log( "The customerID could not be found.");
      }
    };


    this.availableCars = function () {
      return this.cars.filter(function(car) {
        return car.available == true;
      });
    };

    this.rentCar = function (customerID, rentalDuration) {
      var availableCars = this.availableCars();
      if (availableCars.length === 0) {
        console.log("All our cars have been rented");
      } else {
        var customer = this.getCustomer(customerID);
        if (customer) {
          var car = availableCars[0];
          customer.carRented = car;
          car.reserve(customer, rentalDuration);
          console.log("The car has been reserved");
        } else {
          console.log("Please provide a valid customerID");
        }
      }
    };

    this.returnCar = function (customerID) {
      if(getCustomer(customerID)!=undefined) {
        getCustomer(customerID).carRented.return();
        getCustomer(customerID).carRented = null;
        console.log( "Thank you for using our service");
      } else {
        console.log("Please provide a valid customerID");
      }
    }

    this.totalRevenue = function () {
      return this.cars.reduce(function(acc,val,ind,arr){
        return acc += arr[ind].quotePrice();
      });
    }
  };

  };


  var customerInfo = {
    id: "001",
    name: "Sherman"
  };

  var customerA = new Customer(customerInfo);

  var carInfo = {
    id: "001",
    producer: "Toyota",
    model: "Subra",
    rentalPrice: 200,
  };

  var carA = new Car(carInfo);

  var vendor = new Vendor('Jens Limited');
  vendor.addCustomer(customerA);
  vendor.addCar(carA);

  console.log(vendor.availableCars());
  vendor.rentCar(customerA.id, 5);
  console.log(vendor.availableCars());
  console.log(vendor.totalRevenue());

  vendor.removeCustormer("001");
  console.log(vendor.customers);

  vendor.removeCar("001");
  console.log(vendor.cars);
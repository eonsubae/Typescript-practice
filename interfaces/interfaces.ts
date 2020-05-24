interface Vehicle {
  name: string;
  year: number; // Date
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary() {
    return `Name: ${this.name}`;
  },
};

const printVehicle = (vehicle: Vehicle): void => {
  vehicle.summary();
};

printVehicle(oldCivic);

import React, { FC } from "react";
import Button from "../Button/Button";
import { CarsData } from "../../hooks/useCars";

interface CarCardProps {
  car: CarsData;
}

const styles = {
  carBtnStyle: {
    color: "#326bb4",
    fontWeight: 600,
    fontSize: 14,
  },
  bodyTypeStyle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#6c757d",
  },
  modelStyle: {
    fontSize: 16,
    fontWeight: 600,
  },
  modelTypeStyle: {
    fontSize: 16,
    color: "#495057",
  },
} as const;

const CarCard: FC<CarCardProps> = ({ car }) => {
  const redirectToLearn = (carId: string) => {
    console.log(`Redirecting to Learn Page where car id is : ${carId}`);
  };

  const redirectToShop = (carId: string) => {
    console.log(`Redirecting to Shop Page where car id is : ${carId}`);
  };

  return (
    <div
      aria-describedby={`car-bodyType-${car.bodyType} car-modelType-${car.modelType}`}
      aria-labelledby={`car-title-${car.modelName}`}
      className="p-8 cardContainer"
    >
      <div className="flex flex-col gap-8">
        <p style={styles.bodyTypeStyle} className="uppercase">
          {car.bodyType}
        </p>
        <div className={`flex carsCardContent gap-4 `}>
          <h3
            style={styles.modelStyle}
            className="capitalize font-medium font-16"
          >
            {car.modelName}
          </h3>
          <p style={styles.modelTypeStyle}>{car.modelType}</p>
        </div>
      </div>
      <img
        src={car.imageUrl}
        className="mt-16"
        alt={`A ${car.bodyType} car, model ${car.modelName}`}
        style={{
          aspectRatio: "4/3",
          objectFit: "cover",
        }}
      />
      <div className="mt-8 flex gap-24 justify-center items-center">
        <Button
          label="Learn"
          className="gap-4 font-medium items-center"
          variant="text"
          style={styles.carBtnStyle}
          onClick={() => redirectToLearn(car.id)}
          aria-label={`Learn more about ${car.modelName}`}
        />
        <Button
          className="gap-4 font-medium items-center"
          label="Shop"
          style={styles.carBtnStyle}
          variant="text"
          onClick={() => redirectToShop(car.id)}
          aria-label={`Shop for ${car.modelName}`}
        />
      </div>
    </div>
  );
};

export default CarCard;

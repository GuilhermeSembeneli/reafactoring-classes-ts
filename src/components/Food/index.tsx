import React from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";

export interface FoodProps {
  id: number;
  price: number;
  available: boolean;
  name: string;
  description: string;
  image: string;
}

interface Food {
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodProps) => void;
  food: FoodProps;
}
export default function Food(props: Food) {
  const { available } = props.food;
  const [isAvailable, setIsAvailable] = React.useState(available);

  async function toggleAvailable() {
    await api.put(`/foods/${props.food.id}`, {
      ...props.food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    props.handleEditFood(props.food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={props.food.image} alt={props.food.name} />
      </header>
      <section className="body">
        <h2>{props.food.name}</h2>
        <p>{props.food.description}</p>
        <p className="price">
          R$ <b>{props.food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${props.food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => props.handleDelete(props.food.id)}
            data-testid={`remove-food-${props.food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label
            htmlFor={`available-switch-${props.food.id}`}
            className="switch"
          >
            <input
              id={`available-switch-${props.food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${props.food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

/*
class Food extends Component {
  constructor(props) {
    super(props);

    const { available } = this.props.food;
    this.state = {
      isAvailable: available
    };
  }

  toggleAvailable = async () => {
    const { food } = this.props;
    const { isAvailable } = this.state;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    this.setState({ isAvailable: !isAvailable });
  }

  setEditingFood = () => {
    const { food, handleEditFood } = this.props;

    handleEditFood(food);
  }

  render() {
    const { isAvailable } = this.state;
    const { food, handleDelete } = this.props;

    return (
      <Container available={isAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={this.setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={this.toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
  }
};

export default Food;*/

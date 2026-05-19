import React from "react";

const AddPizzaForm: React.FC = () => {

    const initState = {
        title: "",
        price: 0,
        imageUrl: ""
    };

    const [newPizza, setNewPizza] = React.useState<{title: string; price: number; imageUrl: string}>(initState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleChange >> ', e.target);
        const { name, value } = e.target;
        console.log('handleChange >> ', name, value);
    
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('handleSubmit >> ', newPizza);
    }

    return (
        <form onSubmit={handleSubmit}>  
            <input 
                name = "title"
                type = "text"
                placeholder="Название пиццы"
                onChange = {handleChange}
                value = {newPizza.title}
            />
            <input
                name = "price"
                type = "number"
                placeholder="Цена пиццы"
                onChange = {handleChange}
                value = {newPizza.price}
            />
            <input
                name = "imageUrl"
                type = "text"
                placeholder="URL изображения"
                onChange = {handleChange}
                value = {newPizza.imageUrl}
            />    
            <button type="submit">Добавить пиццу</button>  
        </form>
    )
}


export default AddPizzaForm;
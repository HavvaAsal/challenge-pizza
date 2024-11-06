import { useState } from 'react'
import { Form, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'

function App() {
  const extras = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"];

  const [squares, setSquares] = useState([]);

  const handleSquareChange = (index) => {
    setSquares((squares) =>
      squares.includes(index)
        ? squares.filter((i) => i !== index)
        : [...squares, index]
    );
  };

  return (
    <>
      <div className='App'>
        <header>
          <div className='header-container'>
            <h1>Teknolojik Yemekler</h1>
            <div className="main-container">
              <p> Anasayfa - Seçenekler - <strong>Sipariş Oluştur</strong></p>
            </div>
          </div>
        </header>

        <main className='main'>
          <div className='main-container'>
            <h3>Position Absolute Acı Pizza</h3>
            <div className='food-info'>
              <h2>85.50₺</h2>
              <p>4.9</p>
              <p>(200)</p>
            </div>
            <div className='food-description'>
              <p>
                Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
              </p>
            </div>
          </div>
          <div className="size-selection">
            <h2>Boyut Seç<span style={{ color: "red" }}>*</span></h2>
            <label>
              <input type="radio" name="size" value="small" />
              Küçük
            </label>
            <label>
              <input type="radio" name="size" value="medium" />
              Orta
            </label>
            <label>
              <input type="radio" name="size" value="large" />
              Büyük
            </label>
          </div>
          <div className="size-selection">
            <h2>Hamur Seç<span style={{ color: "red" }}>*</span></h2>
            <label for="type-select"></label>
            <select id="type-select" name="type">
              <option value="" selected disabled>Hamur Kalınlığı</option>
              <option value="thin">İnce</option>
              <option value="medium">Orta</option>
              <option value="thick">Kalın</option>
            </select>
          </div>
          <div className="square-selection">
            <h2>Ek Malzemeler</h2>
            <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="squares-container">
              {extras.map((extra, index) => (
                <label key={index} className="square">
                  <input
                    type="checkbox"
                    checked={squares.includes(index)}
                    onChange={() => handleSquareChange(index)} />
                  <span className={squares.includes(index) ? 'selected' : ''}>
                    {extra}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Form>
            <FormGroup>
              <Label for="exampleText">
                <h2>Sipariş Notu</h2>
              </Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                placeholder='Siparişinize eklemek istediğiniz bir not var mı?'
              />
            </FormGroup>
          </Form>

          <hr></hr>

          <ButtonGroup>
            <Button color="yellow">
              -
            </Button>
            <Button color="white">
              1
            </Button>
            <Button color="yellow">
              +
            </Button>
          </ButtonGroup>
        </main>


      </div>

    </>
  )
}

export default App

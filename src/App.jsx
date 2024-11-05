import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'
import { Input } from 'reactstrap';

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
            <div className='ass'>
              <p> Anasayfa - Seçenekler - <strong>Sipariş Oluştur</strong></p>
            </div>
          </div>
        </header>
        <main>
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
        </main>
        <div class="size-selection">
          <h2>Boyut Seç</h2>
          <label>
            <input type="radio" name="size" value="small" />
            <span>Küçük</span>
          </label>
          <label>
            <input type="radio" name="size" value="medium" />
            <span>Orta</span>
          </label>
          <label>
            <input type="radio" name="size" value="large" />
            <span>Büyük</span>
          </label>
        </div>
        <div class="size-selection"></div>
        <label for="size-select"><h2>Hamur Seç*</h2></label>
        <select id="size-select" name="size">
          <option value="" selected disabled>Hamur Kalınlığı</option>
          <option value="thin">İnce</option>
          <option value="medium">Orta</option>
          <option value="thick">Kalın</option>
        </select>
        <h2>Ek Malzemeler</h2>
        <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
        <div className="square-selection">
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


      </div>


    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap'
import axios from 'axios';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const extrasList = ["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"];
const boyutList = ["küçük", "orta", "büyük"];
const doughList = ["ince", "normal", "kalın"];
const initialForm = {
  "boyut": "-1",
  "hamur": "-1",
  "extras": [],
  "note": ""
}


function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [sayi, setSayi] = useState(1);
  const [isValid, setIsValid] = useState(false);

  const arttir = () => {
    setSayi(sayi + 1)
  };

  const azalt = () => {
    if (sayi > 1) {
      setSayi(sayi - 1)
    }
  }
  const secim = formData.extras.length > 4 && formData.extras.length < 10
    ? formData.extras.length * 5
    : 0;

  const toplamHesap = secim + (sayi * 85.5);
  
  const handleChange = (event) => {
    const { name, checked, type, value } = event.target
    console.log("type, name, value, checked:", type, name, value, checked)

    if (name === "malzeme") {
      if (checked === true) {
        setFormData({
          ...formData,
          extras: [...formData.extras, value]
        });
      } else {
        setFormData({
          ...formData,
          extras: formData.extras.filter((ext) => ext !== value)
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }



    // validasyonlar

    if (name === "boyut") {
      if (value === "") {
        setErrors({ ...errors, [name]: "Boyut seçiniz." })
      } else {
        setErrors({ ...errors, [name]: "" })
      }
    }

    if (name === "hamur") {
      if (value === "") {
        setErrors({ ...errors, [name]: "Hamur kalınlığını seçiniz." })
      } else {
        setErrors({ ...errors, [name]: { name } });
      }
    }



    if (name === "malzeme")
      if (formData.extras.length < 4 || formData.extras.length > 10) {
        setErrors({ ...errors, [name]: "En az 4 tane en fazla 10 tane malzeme seçiniz." })
      } else {
        setErrors({ ...errors, [name]: "" })
      }

    if (name === "note")
      if (formData.note.length < 3) {
        setErrors({ ...errors, [name]: "En az 3 karakter giriniz." })
      } else {
        setErrors({ ...errors, [name]: { name } })
      }

    setErrors({ ...errors })
    console.log(setErrors({ ...errors }))
  }

  useEffect(() => {
    if ((formData.boyut && !errors.boyut) &&
      (formData.hamur && !errors.hamur) &&
      (formData.extras && !errors.malzeme) &&
      (formData.note && !errors.note)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return

    axios
      .post("https://reqres.in/api/pizza")
      .then((response) => {
        setFormData(initialForm)
        console.log("Sipariş Özeti:", response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='App'>
        <header>
          <div className='header-container'>
            <h1>Teknolojik Yemekler</h1>
            <div className="main-container">
              <p> Anasayfa - <strong>Sipariş Oluştur</strong></p>
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

          <Form className='form-group'>
            <div className="size-selection">
              <Label
                className='size'
                htmlFor='boyut'>Boyut Seç<span style={{ color: "red" }}>*</span>
              </Label>
              {boyutList
                .map((boyut, index) => {
                  return <FormGroup key={"s" + index}>

                    <Input
                      id={boyut}
                      name="boyut"
                      type="radio"
                      onChange={handleChange}
                      value={formData.boyut} />{" "}
                    <Label htmlFor={boyut}>{boyut}</Label>
                  </FormGroup>
                })}
            </div>

            <div className="size-selection">
              <Label
                className="size"
                htmlFor="hamur">Hamur Seç<span style={{ color: "red" }}>*</span>
              </Label>

              <select onChange={handleChange}
                value={formData.hamur} >
                {doughList.map((d, ind) => {
                  return <option key={ind} value={d}>{d}</option>
                })}
              </select>
            </div>

            <div className="extra-selection">

              <h2>Ek Malzemeler</h2>
              <p>En fazla 10 malzeme seçebilirsiniz. 5₺ <span style={{ color: "red" }}>*</span></p>
              {extrasList.map((ext, index) => {
                return <FormGroup className='mlz' key={"ext" + index}>
                  <Input
                    id={ext}
                    value={ext}
                    name="malzeme"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.extras.includes(ext)} />
                  <Label htmlFor={ext}>{ext}</Label>
                </FormGroup>
              })}
            </div>

            <FormGroup>
              <Label className="text">Sipariş Notu</Label>
              <Input
                id="note"
                name="note"
                type="textarea"
                placeholder='Siparişinize eklemek istediğiniz bir not var mı?'
                onChange={handleChange}
              />
            </FormGroup>

            <hr></hr>

            <ButtonGroup>
              <div className='btn'></div>
              <Button onClick={azalt} className='eksi'>
                -
              </Button>
              <div className='sayi'>{sayi}</div>
              <Button onClick={arttir} className='arti'>
                +
              </Button>
            </ButtonGroup>

            <div className='toplam'>
              <h2>Sipariş Toplamı</h2>
              <div>
                <p>Seçimler</p>
                <p>{secim}₺</p>
              </div>

              <div>
                <p>Toplam</p>
                <p>{toplamHesap}₺</p>
              </div>
            </div>
            <div>
              <Button disabled={!isValid} type="submit" className="siparisVer">SİPARİŞ VER</Button>
            </div>
          </Form>
        </main >
      </div>


    </>
  )
}

export default App

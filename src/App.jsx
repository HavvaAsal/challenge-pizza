import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap'
import React from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from 'axios';



const extras = [
  "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"];
const sizes = ["küçük", "orta", "büyük"];
const hamur = ["ince", "orta", "kalın"];
const initialForm = {
  "boyut": "-1",
  "hamur": "-1",
  "malzeme": [],
  "note": ""
}


function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [extraList, setExtraList] = useState([]);
  const [sayi, setSayi] = useState(1);
  const [isValid, setİsValid] = useState(false);
  const [secimler, setSecimler] = useState(0);
  const [toplam, setToplam] = useState();

  const arttir = (() => {
    setSayi(sayi + 1)
  });

  const azalt = (() => {
    if (sayi > 1) {
      setSayi(sayi - 1)
    }
  })

  const secim = (() => {
    if (extraList.length > 4 && extraList.length < 10) {
      setSecimler(secimler + (extraList.length * 5))
    }
  })

  const toplamHesap = (() => {
    setToplam(toplam + secimler)
  })

  const handleChange = (event) => {
    const { name, checked, type, value } = event.target
    console.log("type, name, value, checked:", type, name, value, checked)


    if (type === "checkbox") {
      if (checked) {
        setExtraList([...extraList.value]);
      } else {
        setExtraList(extraList.filter((item) => item !== value));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }


    if (name === "boyut") {
      if (value === "-1") {
        setErrors({ ...errors, boyut: "Boyut seçiniz." })
      } else {
        setErrors({ ...errors, boyut: "" })
      }
    }

    if (name === "hamur") {
      if (value === "-1") {
        setErrors({ ...errors, hamur: "Hamur kalınlığını seçiniz." })
      } else {
        setErrors({ ...errors, hamur: "" });
      }
    }

    if (name === "malzeme" && checked === true) {
      setExtraList([...extraList, "yenimalzeme"]);
    }
    console.log(extraList.length);

    if (name === "malzeme")
      if (extraList.length < 4 || extraList.length > 10) {
        setErrors({ ...errors, malzeme: "En az 4 tane en fazla 10 tane malzeme seçiniz." })
      } else {
        setErrors({ ...errors, malzeme: "" })
      }

    if (name === "note")
      if (value.length < 3) {
        setErrors({ ...errors, note: "En az 3 karakter giriniz." })
      } else {
        setErrors({ ...errors, note: "" })
      }

    setErrors({ ...errors })
    console.log(setErrors({ ...errors }))
  }

  useEffect(() => {
    if ((formData.boyut && !errors.boyut) &&
      (formData.hamur && !errors.hamur) &&
      (formData.malzeme && !errors.malzeme) &&
      (formData.note && !errors.note)) {
      setİsValid(true)
    } else {
      setİsValid(false)
    }
  }, [formData, errors]);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return

    axios
      .post("https://reqres.in/api/pizza", formData)
      .then((response) => {
        setFormData(initialForm)
        console.log("Sipariş Özeti:", response.data);
      })
      .catch((error) => {
        console.error("Hata Oluştu:".error);
      });
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

          <div className="size-selection">
            <Form className='form-group'>

              <Label
                className='size'
                htmlFor='boyut'>Boyut Seç<span style={{ color: "red" }}>*</span>
              </Label>

              {sizes.map((boyut, index) => {
                return <FormGroup>
                  <Input
                    key={index}
                    id={boyut}
                    name="boyut"
                    type="radio"
                    onChange={handleChange}
                    value={formData.boyut} />{" "}
                  <Label htmlFor={boyut}>{boyut}</Label>
                </FormGroup>
              })}
            </Form>
          </div>

          <div className="size-selection">
            <Form className='form-group'>
              <Label
                className="size"
                htmlFor="hamur">Hamur Seç<span style={{ color: "red" }}>*</span>
              </Label>

              <select onChange={handleChange}
                value={formData.hamurlar} >
                {hamur.map((hamur) => {
                  return <option value={hamur}>{hamur}</option>
                })}
              </select>
            </Form>
          </div>

          <div className="extra-selection">
            <Form>

              <h2>Ek Malzemeler</h2>
              <p>En fazla 10 malzeme seçebilirsiniz. 5₺ <span style={{ color: "red" }}>*</span></p>
              {extras.map((mlz, index) => {
                return <FormGroup className='mlz' key={index}>
                  <Input
                    id={mlz}
                    name="malzeme"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.mlz} />
                  <Label htmlFor={mlz}>{mlz}</Label>
                </FormGroup>
              })}
            </Form>
          </div>

          <div>
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
          </div>

          <hr></hr>

          <ButtonGroup>
            <div className='btn'></div>
            <Button onClick={azalt} className='eksi'>
              -
            </Button>
            <Button className='sayi'>{sayi} </Button>
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
            <Form onSubmit={handleSubmit}>
              <Button disabled={!isValid} type="submit" className="siparisVer">SİPARİŞ VER</Button>
            </Form>
          </div>
        </main >
      </div>


    </>
  )
}

export default App

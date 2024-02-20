import { useState, useEffect } from "react";
import { Formik } from "formik";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    symptoms: [],
  });
  // const [formSymtomps, setFormSymtomps] = useState();
  // const [formContacts, setFormContacts] = useState();

  const REGEX = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
  };

  const genders = ["Nam", "Nữ", "Khác"];
  const symptoms = ["Sốt", "Ho", "Khó thở", "Viêm phổi", "Đau họng", "Mệt mỏi"];
  const contacts = [
    "Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19",
    "Người từ nước có bệnh COVID-19",
    "Người có biểu hiện(Sốt, ho, khó thở, viêm phổi",
  ];

  const handleChange = (event) => {
    let value =
      event.target.type === "checkbox"
        ? !form[event.target.name]
        : event.target.value;
    setForm({ ...form, [event.target.name]: value });
  };

  const handleChangeSymptoms = (event) => {
    const symptom = event.target.name;
    const isChecked = event.target.checked;
    setForm((prevForm) => {
      let updatedSymptoms;
      if (isChecked) {
        updatedSymptoms = prevForm.symptoms
          ? [...prevForm.symptoms, symptom]
          : [symptom];
      } else {
        updatedSymptoms = prevForm.symptoms.filter((item) => item !== symptom);
      }

      console.log("Updated Symptoms:", updatedSymptoms);

      return {
        ...prevForm,
        symptoms: updatedSymptoms,
      };
    });

    //Bất đồng bộ,
    //The reason for this is that React batches state updates for performance reasons.
    //When you call setForm, React schedules the state update, but it doesn't happen synchronously.
    //Therefore, if you immediately try to access the state variable after calling setForm, you may not get the updated value.
    // --> Xử lý bất đồng bộ: Promise, useEffect, async/await
    // console.log(form.symptoms);
  };

  const handleChangeContact = (event) => {
    const contact = event.target.name;
    const isChecked = event.target.checked;

    setForm((prevForm) => {
      let updatedContacts;
      if (isChecked) {
        updatedContacts = prevForm.contacts
          ? [...prevForm.contacts, contact]
          : [contact];
      } else {
        //Sao chép những phần tử trong prevForm.contacts mà không chứa contact.
        updatedContacts = prevForm.contacts.filter((item) => item != contact);
        console.log(`length: ${updatedContacts.length}`);
      }

      return { ...prevForm, contacts: updatedContacts };
    });
  };

  useEffect(() => {
    // Actions to perform after state update
    console.log("Form state has been updated:", form);
  }, [form]);

  const handleSubmit = () => {
    alert("Declare health successfully");
  };

  const handleValidate = () => {
    const errors = {};
    let infos = [
      "name",
      "passport",
      "dateOfBirth",
      "nationality",
      "province",
      "district",
      "ward",
      "street",
      "phone",
      "email",
    ];

    for (let info of infos) {
      if (!form[info]) {
        errors[info] = "Bắt buộc";
      }
    }

    if (!REGEX.email.test(form.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (form.dateOfBirth <= 1900) {
      errors.dateOfBirth = "Năm sinh không hợp lệ";
    }

    return errors;
  };

  return (
    <div>
      <h1>Tờ khai y tế</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`custom-input ${
                errors.name ? "custom-input-error" : ""
              }`}
            >
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.name}</p>
            </div>
            <div
              className={`custom-input ${
                errors.passport ? "custom-input-error" : ""
              }`}
            >
              <label>Số hộ chiếu/CMND</label>
              <input
                type="text"
                name="passport"
                value={form.passport || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.passport}</p>
            </div>
            <div
              className={`custom-input ${
                errors.dateOfBirth ? "custom-input-error" : ""
              }`}
            >
              <label>Năm sinh</label>
              <input
                type="text"
                name="dateOfBirth"
                value={form.dateOfBirth || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.dateOfBirth}</p>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {" "}
              Giới tính
              {genders.map((gender) => (
                <div key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    id={gender}
                    value={form.gender || gender}
                    onChange={handleChange}
                  />
                  <label htmlFor={gender}>{gender}</label>
                </div>
              ))}
            </div>
            <div
              className={`custom-input ${
                errors.nationality ? "custom-input-error" : ""
              }`}
            >
              <label>Quốc tịch</label>
              <input
                type="text"
                name="nationality"
                value={form.nationality || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.nationality}</p>
            </div>
            <div>
              <label>Công ty làm việc</label>
              <input
                type="text"
                name="company"
                value={form.company || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bộ phận làm việc</label>
              <input
                type="text"
                name="department"
                value={form.department || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="insurance">Có bảo hiểm y tế</label>
              <input
                type="checkbox"
                name="insurance"
                id="insurance"
                value={form.insurance || ""}
                onChange={handleChange}
              />
            </div>
            <h3>Địa chỉ liên lạc tại Việt Nam</h3>
            <div
              className={`custom-input ${
                errors.province ? "custom-input-error" : ""
              }`}
            >
              <label>Tỉnh thành</label>
              <input
                type="text"
                name="province"
                value={form.province || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.province}</p>
            </div>
            <div
              className={`custom-input ${
                errors.district ? "custom-input-error" : ""
              }`}
            >
              <label>Quận/huyện</label>
              <input
                type="text"
                name="district"
                value={form.district || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.district}</p>
            </div>
            <div
              className={`custom-input ${
                errors.ward ? "custom-input-error" : ""
              }`}
            >
              <label>Phường/xã</label>
              <input
                type="text"
                name="ward"
                value={form.ward || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.ward}</p>
            </div>
            <div
              className={`custom-input ${
                errors.street ? "custom-input-error" : ""
              }`}
            >
              <label>Số nhà, phố, tổ dân phô/thôn/đội</label>
              <input
                type="text"
                name="street"
                value={form.street || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.street}</p>
            </div>
            <div
              className={`custom-input ${
                errors.phone ? "custom-input-error" : ""
              }`}
            >
              <label>Điện thoại</label>
              <input
                type="text"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.phone}</p>
            </div>
            <div
              className={`custom-input ${
                errors.email ? "custom-input-error" : ""
              }`}
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
            </div>
            <h3>
              Trong vòng 14 ngày qua, Anh/Chị có đến quốc gia/vùng lãnh thổ
              nào(Có thể đi qua nhiều quốc gia)
            </h3>
            <input
              type="text"
              name="visitedCountries"
              value={form.visitedCountries || ""}
              onChange={handleChange}
            />
            <h3>
              Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện dấu hiệu nào sau
              đây không?
            </h3>
            {symptoms.map((symptom) => (
              <div style={{ display: "flex" }} key={symptom}>
                <input
                  type="checkbox"
                  name={symptom}
                  id={symptom}
                  value={form.symptoms || { symptom }}
                  onChange={handleChangeSymptoms}
                />
                <label htmlFor={symptom}>{symptom}</label>
              </div>
            ))}
            <h3>Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với?</h3>
            {contacts.map((contact) => (
              <div style={{ display: "flex" }} key={contact}>
                <input
                  type="checkbox"
                  name={contact}
                  id={contact}
                  value={form.contacts || { contact }}
                  onChange={handleChangeContact}
                />
                <label htmlFor={contact}>{contact}</label>
              </div>
            ))}
            <button type="submit">Nộp</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;

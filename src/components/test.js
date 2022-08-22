const [data, setData] = useState({
    email: "",
    password: ""
  });




  const handleChange =(e) => {
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password
    };
    axios.post("https://reqres.in/api/login", 
    userData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
    });
  };

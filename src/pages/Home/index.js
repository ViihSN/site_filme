import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

//URL da api: https://api.themoviedb.org/3/movie/now_playing?api_key=1203ab361bd84b858ab9e8b63b27f849&language=pt-BR

function Home() {

  //Variavel de estado (filmes) + função (setFilmes) atualiza a variavel de estado.
  const [filmes, setFilmes] = useState([]);
  //implementar um loading
  const [loading, setLoading] = useState(true); //useState boelano começando com verdadeiro


  //(loadFilmes) é uma função assincrona que faz uma requisição http usando (api.get)
  useEffect(() => {
    async function loadFilmes() {
      //Busca filmes que estão em exibição
      const response = await api.get("movie/now_playing", {
        //parametros 
        params: {
          api_key: "1203ab361bd84b858ab9e8b63b27f849",
          language: "pt-BR",
          page: 1,
        }
      })

      //console.log(response.data.results.slice(0, 10));
      //Depois da busca chegar a uma resposta, a função (setfilmes) é chamada.
      setFilmes(response.data.results.slice(0, 10))
      setLoading(false);
    }

    loadFilmes();
  }, [])

  //comparação
  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>

    </div>
  )
}

export default Home;
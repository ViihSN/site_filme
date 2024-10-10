import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './filme-info.css';

import api from '../../services/api';

function Filmes() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilmes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "1203ab361bd84b858ab9e8b63b27f849",
          language: "pt-BR",
        }
      })

        .then((response) => {
          setFilmes(response.data);
          setLoading(false);
        })

        .catch(() => {
          console.log('filme não encontrado');
          navigate("/",{ replace: true}); //caso o filme não seja encontrado, ele joga automaticamente para a pag. Inicial 
          return;
        })
    }

    loadFilmes();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO')
    }

  }, [navigate, id])

  function salvarFilme(){
    const minhalista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhalista) || [];

    const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)
    
    if(hasFilme){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10 </strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar Filme</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Assistir Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filmes;
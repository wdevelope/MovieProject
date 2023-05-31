const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjc5ZDNhNjVlZTRjNTBhZTIzNmMzOWI4ZDMzNzRhZCIsInN1YiI6IjY0NzA4ODY4YzVhZGE1MDBhODJkZjE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wa7Omy-RR3LAg1gii-tD_eCA-HSJlPRrAEK2NKb08Ac'
    }
};

const cardContainer = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const titleElement = document.querySelector('h1');

let moviesData = [];

// API 호출하여 영화 목록 받아오기
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        moviesData = data.results;

        // 영화 목록을 카드 형태로 표시
        renderMovieCards(moviesData);
    })

// 영화 카드 생성 및 화면에 표시
function renderMovieCards(movies) {
    cardContainer.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = movie.title;
        card.appendChild(title);

        const overview = document.createElement('p');
        overview.textContent = movie.overview;
        card.appendChild(overview);

        const voteAverage = document.createElement('span');
        voteAverage.textContent = `평점: ${movie.vote_average}`;
        card.appendChild(voteAverage);

        card.addEventListener('click', () => {
            alert(`선택한 영화 ID: ${movie.id}`);
        });

        cardContainer.appendChild(card);
    });
}

// 검색 버튼 클릭 이벤트 
searchButton.addEventListener('click', handleSearch);


// 검색 입력창에서 엔터 키 입력 이벤트
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});


// h1 클릭 이벤트 
titleElement.addEventListener('click', () => {
    searchInput.value = '';  // 검색 입력값 초기화
    renderMovieCards(moviesData);  // 전체 영화 카드 목록 표시
});
titleElement.style.cursor = 'pointer';


// 검색 처리 함수
function handleSearch() {
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue === '') {
        // 입력값이 없는 경우 전체 영화 카드 목록 표시
        renderMovieCards(moviesData);
    } else {
        // 입력값이 있는 경우 해당 검색어를 포함하는 영화 카드 목록 표시
        const filteredMovies = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(searchValue)
        );
        renderMovieCards(filteredMovies);
    }
}
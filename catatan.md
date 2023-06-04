## Self Notes

npx create-react-app client 
cd client 
cd src
npm i react-router-dom redux react-redux redux-thunk
npm install react-bootstrap bootstrap

taro di index.js:
import 'bootstrap/dist/css/bootstrap.min.css';

npm install --save sweetalert2 sweetalert2-react-content  
Doc: https://www.c-sharpcorner.com/article/how-to-use-sweetalert2-in-react-application/


cd src
mkdir Pages Routes Store Components Layout
touch Routes/index.jsx Store/actionType.js Store/actionCreator.js Store/reducer.js Store/index.js Layout/BaseLayout

## Stores

- index.js
    - import from redux : applyMiddleware, legacy_createStore as createStore, combineReducers
    - import from redux-thunk : thunk
    - import reducer nya

buat variable rootReducer untuk menampung combineReducers invoke berisi objek berisi <nama state di reducer>:<nama reducer yang diimport>

buat variable store untuk menampung createStore invoke berisi rootReducer, applyMiddleware invoke thunk

export store

- actionType.js
    export variable capital:<nama-fetch_nama-method_nama-state> = string:<nama-fetch>/<nama-method><nama-state>

- actionCreator.js
    import semua action type yang dibuat
    buat variable url berisi "http://localhost:3000/"

    //! apabila ingin get
    buat setter untuk mengirim payload ke reducer
    caranya:
    buat export variable "get" untuk menampung invoke payload arrow object return object:
    type: <nama action type>,
    payload

    // fetch action
    buat export variable <nama fetch action> untuk menampung invoke (apabila ada params isi di invoke) arrow object berisi return async invoke (kalau ada dispatcher isi di sini) arrow object berisi try catch (jgn lupa console log error)
    lakukan fetch di dalam try

    format fetch:
    buat variabel res untuk menampung fetch invoke berisi url + string:<nama path> atau kalau ada params masukin di sini, object berisi method: "<nama method>", headers: object "Content_Type": "application/json", <headers yang mau dikirim>, body: JSON.stringify invoke berisi <parameter yang diterima fetch / yang dikirim dispatcher>

    // untuk fetch get
    setelah fetch
    buat variable data untuk menampung res.json invoke
    lalu kirim data menggunakan dispatcher ke get

    jangan lupa untuk fetch ulang halaman yang terkait dengan action post dkk dengan menggunakan dispatcher invoke fetch action terkait


- reducer.js

    - import semua action type

    buat initial state caranya:
    buat variable initialState untuk menampung object yang berisi:
    <nama state>: <jenis data state empty>

    - lalu buat switch case untuk reducer caranya:
    buat variable <nama reducer> untuk menampung invoke berisi state = initialState, action arrow object berisi switch case:
    invoke switch berisi action.type
    case spasi <nama action type> object berisi
    return object berisi
    spread state,
    <nama state>: action.payload

    default:
    return state

    export reducer

## App.js

    - delete import logo
    - import router dari folder router saja
    - import store dari folder store lalu index
    - import distract Provider dari react-redux 

    - delete isi return App
    - ganti dengan <Provider store={store}><RouterProvider router={router} /></Provider>
    - export app

## index.js
    cuma tambahin import bootsrap

## BaseLayout

    - import distract Outlet dari "react-router-dom";
    - import Navbar dari folder Components

    buat function BaseLayout dengan mereturn <div><Navbar/><Outlet/></div>

    export BaseLayout

## Router/index.js

    - import distract createBrowserRouter dari "react-router-dom"
    import semua pages yang ada dan harus menggunakan capital

    untuk ada navguard tambahkan:
    - import distract redirect dari "react-router-dom";

    - buat variable router yang berisi createBrowserRouter invoke berisi array berisi object berisi
    element: <BaseLayout/>,
    childern: array berisi object berisi:
        path: string path,
        element: <nama page/>

    tambahkan loader setelah BaseLayout apabila menggunakan guarder
    gunakan logic loader di dalam object callback
    define guarder yang digunakan misalnya access_token
    lalu buat kondisi untuk guarder

## pages

    - format pages adalah jsx berisi

    function <nama page>invoke object berisi

    logic di sini

    return invoke berisi
    template di sini

    export <nama page>

    - Hooks

        - useState dan useEffect diimport dari react
        - Link, useParams, useNavigate diimport dari react-router-dom
        - useSelector dan useDispatch diimport dari react-redux

        hooks react-redux didefine di awal logic dengan membuat variable lalu diinvoke

        constoh format hooks:

        const [<nama state>, setValues] = useState()
        useEffect(() => {<fetch yang dipanggil>invoke}, lifecycle);
        const navigate = useNavigate()
        const dispatcher = useDispatch()
        const { <nama params di path> } = useParams()
        const { <nama global state> } = useSelector((state) => state.<nama global state>)

    - handle action

        - untuk fetch data:
        
            buat variable <nama fetch> = async invoke arrow object berisi
            try
            await dispatcher(<nama fetch action> invoke params bila dibutuhkan);
            catch
            console.log error

        - untuk post data:

            buat variable input untuk menampung object berisi
            <nama input>: <jenis data empty>

            buat state local dengan useState berisi input

            buat handle untuk perubahan input:
                buat variable <nama handle> untuk menampung invoke berisi event arrow object berisi
                buat variable distract name, value untuk menampung event target
                set<nama state> invoke berisi object berisi
                spread <nama state>,
                array berisi name : value

            buat handle submit:

                buat variable <nama handle> untuk menampung invoke berisi event/params dari tombol arrow object berisi
                event.preventDefault()
                try
                await dispatcher(<nama fetchaction> invoke berisi state local)
                navigaet invoke berisi nama path router
                catch
                console.log(error)

            - contoh handle di template

            Link to={<nama path> kirim params di sini}
            Link juga bisa dipadukan dengan onClick dengan mengganti to

            onClick={<nama handle>} <-- untuk simple handle seperti logout
            onSubmit={handleSubmit} <-- ada di tag form
            onChange={<nama handle>} <-- untuk handle input change 

            onClick={() => <namahandle>(params)} <-- untuk delete
        
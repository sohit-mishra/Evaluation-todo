import { Routes , Route} from 'react-router-dom'
import Home from '../Component/Home'
import Create from '../Component/Create'
import Edit from '../Component/Edit'
import Single from '../Component/Single'
import PageNotFound from '../Component/PageNotFound'

export default function AllRoutes() {
  return (
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Create/>} path="create"/>
        <Route element={<Edit/>} path="edit/:id"/>
        <Route element={<Single/>} path="task/:id"/>
        <Route element={<PageNotFound/>} path="*"/>
      </Routes>

  )
}

import Layout from "../components/layout/primaryLayout"
import DashboardView from '../views/dashboard'

export default function IndexPage() {
  return (
    <Layout selected="dashboard">
      <DashboardView/>
    </Layout>
  )
}

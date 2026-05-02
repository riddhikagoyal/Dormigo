import { useParams } from "react-router-dom";
import CategorySection from "../components/CategorySection";

export default function Home() {
  const { city } = useParams(); // ✅ get ":city" from URL
  const BACKEND_ORIGIN = "http://127.0.0.1:5000";

  return (
    <div className="container mt-5">

      <CategorySection
        title="Find Comfortable Hostels & PGs"
        desc="Explore affordable and safe hostel and PG accommodations."
        icon="bi-house"
        label="Hostels/PG"
        link={`/${city}/hostels`} // ✅ works now
      />

      <CategorySection
        title="Top Coaching Institutes"
        desc="Browse leading coaching institutes."
        icon="bi-mortarboard"
        label="Institutes"
        link={`/${city}/institutes`}
        reverse
      />

      <CategorySection
        title="Quiet Libraries for Study"
        desc="Find peaceful libraries with modern facilities."
        icon="bi-pencil"
        label="Libraries"
        link={`/${city}/libraries`}
      />

      <CategorySection
        title="Nearby Hospitals & Clinics"
        desc="Access a list of reliable hospitals and clinics."
        icon="bi-hospital"
        label="Hospitals"
        link={`/${city}/hospitals`}
        reverse
      />
    </div>
  );
}




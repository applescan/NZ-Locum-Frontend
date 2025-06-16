import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Context from './context/Context';
import { Layout } from './components/layout';
import Loading from './components/elements/Loading/Loading';

// Eager loaded pages
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import About from './components/pages/About';
import JobDetails from './components/pages/JobDetails';
import SignUpDoctor from './components/sections/Register/SignUpDoctor';
import SignInDoctor from './components/sections/SignIn/SignInDoctor';
import SignInClinic from './components/sections/SignIn/SignInClinic';
import SignUpClinic from './components/sections/Register/SignUpClinic';

// Lazy loaded pages
const LazyDoctorProfile = React.lazy(() => import('./components/pages/DoctorProfile'));
const LazyClinicProfile = React.lazy(() => import('./components/pages/ClinicProfile'));
const LazyDoctorList = React.lazy(() => import('./components/pages/DoctorList'));
const LazyClinicList = React.lazy(() => import('./components/pages/ClinicList'));
const LazyJobList = React.lazy(() => import('./components/pages/JobList'));

function App() {
  return (
    <Context>
      <Layout>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Authentication routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in-doctor" element={<SignInDoctor />} />
          <Route path="/sign-in-clinic" element={<SignInClinic />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up-doctor" element={<SignUpDoctor />} />
          <Route path="/sign-up-clinic" element={<SignUpClinic />} />

          {/* Job routes */}
          <Route path="/job-search/:id" element={<JobDetails />} />
          <Route
            path="/job-search"
            element={
              <Suspense fallback={<Loading />}>
                <LazyJobList />
              </Suspense>
            }
          />

          {/* Doctor routes */}
          <Route
            path="/doctors"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDoctorList />
              </Suspense>
            }
          />
          <Route
            path="/doctor-profile"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDoctorProfile />
              </Suspense>
            }
          />

          {/* Clinic routes */}
          <Route
            path="/clinics"
            element={
              <Suspense fallback={<Loading />}>
                <LazyClinicList />
              </Suspense>
            }
          />
          <Route
            path="/clinic-profile"
            element={
              <Suspense fallback={<Loading />}>
                <LazyClinicProfile />
              </Suspense>
            }
          />

          {/* About route */}
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Context>
  );
}

export default App;

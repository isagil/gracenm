/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { Innovation } from "./pages/Innovation";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Quote } from "./pages/Quote";
import { CustomizerProvider } from "./context/CustomizerContext";

export default function App() {
  return (
    <CustomizerProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/admin" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomizerProvider>
  );
}


import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { usePageTransition } from '@/lib/animations';

const About = () => {
  const { className } = usePageTransition();

  return (
    <div className={className}>
      <Navbar />
      
      <div className="page-container py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Mara</h1>
          
          <div className="prose lg:prose-lg">
            <p className="text-lg text-muted-foreground mb-8">
              Mara is a premier online marketplace dedicated to providing high-quality products
              with exceptional customer service. Since our founding, we've been committed to
              connecting customers with the products they love.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to create an accessible, user-friendly platform that connects
              people with high-quality products while supporting ethical business practices
              and sustainable consumption.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              Mara began with a simple idea: online shopping should be easy, enjoyable, and
              reliable. Our founders recognized the need for a platform that focused equally
              on product quality, user experience, and customer satisfaction.
            </p>
            <p>
              What started as a small operation has grown into a comprehensive marketplace
              offering products across numerous categories, from electronics to home goods,
              fashion to foods.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Quality:</strong> We carefully curate our product selection to ensure only the best items make it to our platform.</li>
              <li><strong>Transparency:</strong> We believe in honest communication with our customers about our products and business practices.</li>
              <li><strong>Innovation:</strong> We continuously improve our platform and services to meet evolving customer needs.</li>
              <li><strong>Sustainability:</strong> We're committed to environmentally responsible practices in our operations.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
            <p>
              Whether you're a shopper looking for quality products or a seller interested in
              reaching new customers, we welcome you to become part of the Mara community.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;

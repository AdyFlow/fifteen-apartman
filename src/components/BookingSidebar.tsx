import { Phone, Mail, MapPin, CreditCard } from 'lucide-react';

export default function BookingSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm p-6 border" style={{ borderColor: '#B8B8B8' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-6">\u00c1raink</h3>
        <div className="space-y-4">
          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>F\u0151szezon</p>
            <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>(M\u00e1jus 31. &ndash; Augusztus 31.)</p>
            <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>min. 4 \u00e9jszaka</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>70.000 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/apartman/\u00e9j</p>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: '#6B7280' }}>Szezonon k\u00edv\u00fcl</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>50.000 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/apartman/\u00e9j</p>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: '#6B7280' }}>Idegenforgalmi ad\u00f3 (IFA)</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>700 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/f\u0151/\u00e9j</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm p-4 border" style={{ borderColor: '#B8B8B8' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard size={20} style={{ color: '#1E3A5F' }} />
          <p className="text-base font-semibold" style={{ color: '#1E3A5F' }}>
            SZ\u00c9P K\u00e1rty\u00e1t elfogadunk
          </p>
        </div>
        <p className="text-center text-sm" style={{ color: '#9CA3AF' }}>
          OTP
        </p>
      </div>

      <div className="bg-white shadow-sm p-6 border" style={{ borderColor: '#B8B8B8' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">El\u00e9rhet\u0151s\u00e9g</h3>
        <div className="space-y-4">
          <a
            href="tel:+36204530000"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Phone size={20} className="mt-0.5 flex-shrink-0" />
            <span>+36 20 453 0000</span>
          </a>
          <a
            href="mailto:info@fifteenapartman.hu"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Mail size={20} className="mt-0.5 flex-shrink-0" />
            <span>info@fifteenapartman.hu</span>
          </a>
          <a
            href="https://www.google.com/maps/place/Balatonf%C3%B6ldv%C3%A1r,+Hunyadi+J%C3%A1nos+u.+15,+8623/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <MapPin size={20} className="mt-0.5 flex-shrink-0" />
            <span>
              8623 Balatonf\u00f6ldv\u00e1r,<br />
              Hunyadi J\u00e1nos utca 15.
            </span>
          </a>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 border border-gray-900">
        <p className="text-center text-base font-medium text-gray-900">
          Egyedi, kedvezm\u00e9nyes foglal\u00e1s\u00e9rt h\u00edvjon minket!
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Foglal\u00e1si folyamat</h3>
        <ol className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              1
            </span>
            <span>D\u00e1tumok \u00e9s adatok megad\u00e1sa</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              2
            </span>
            <span>Visszaigazol\u00e1s</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              3
            </span>
            <span>Foglal\u00f3 befizet\u00e9se (50%)</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              4
            </span>
            <span>Foglal\u00e1s v\u00e9gleges\u00edt\u00e9se</span>
          </li>
        </ol>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Gyors v\u00e1lasz</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          K\u00e9r\u00e9sedre \u00e1ltal\u00e1ban 24 \u00f3r\u00e1n bel\u00fcl v\u00e1laszolunk. S\u00fcrg\u0151s esetben h\u00edvj minket telefonon.
        </p>
      </div>
    </div>
  );
}

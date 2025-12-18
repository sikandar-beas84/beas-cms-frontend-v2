import { useState } from "react";

export default function CountryCodeDropdown({ name, value, onChange }) {
  const [open, setOpen] = useState(false);

  // ALL COUNTRY CODES
  const countryCodes = [
    { code: "AF", dial: "+93", name: "Afghanistan", flag: "🇦🇫" },
    { code: "AL", dial: "+355", name: "Albania", flag: "🇦🇱" },
    { code: "DZ", dial: "+213", name: "Algeria", flag: "🇩🇿" },
    { code: "AD", dial: "+376", name: "Andorra", flag: "🇦🇩" },
    { code: "AO", dial: "+244", name: "Angola", flag: "🇦🇴" },
    { code: "AR", dial: "+54", name: "Argentina", flag: "🇦🇷" },
    { code: "AM", dial: "+374", name: "Armenia", flag: "🇦🇲" },
    { code: "AU", dial: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "AT", dial: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "BH", dial: "+973", name: "Bahrain", flag: "🇧🇭" },
    { code: "BD", dial: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { code: "BY", dial: "+375", name: "Belarus", flag: "🇧🇾" },
    { code: "BE", dial: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "BZ", dial: "+501", name: "Belize", flag: "🇧🇿" },
    { code: "BJ", dial: "+229", name: "Benin", flag: "🇧🇯" },
    { code: "BT", dial: "+975", name: "Bhutan", flag: "🇧🇹" },
    { code: "BO", dial: "+591", name: "Bolivia", flag: "🇧🇴" },
    { code: "BA", dial: "+387", name: "Bosnia & Herzegovina", flag: "🇧🇦" },
    { code: "BW", dial: "+267", name: "Botswana", flag: "🇧🇼" },
    { code: "BR", dial: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "BG", dial: "+359", name: "Bulgaria", flag: "🇧🇬" },
    { code: "KH", dial: "+855", name: "Cambodia", flag: "🇰🇭" },
    { code: "CA", dial: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "CL", dial: "+56", name: "Chile", flag: "🇨🇱" },
    { code: "CN", dial: "+86", name: "China", flag: "🇨🇳" },
    { code: "CO", dial: "+57", name: "Colombia", flag: "🇨🇴" },
    { code: "CR", dial: "+506", name: "Costa Rica", flag: "🇨🇷" },
    { code: "HR", dial: "+385", name: "Croatia", flag: "🇭🇷" },
    { code: "CY", dial: "+357", name: "Cyprus", flag: "🇨🇾" },
    { code: "CZ", dial: "+420", name: "Czech Republic", flag: "🇨🇿" },
    { code: "DK", dial: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "EG", dial: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "EE", dial: "+372", name: "Estonia", flag: "🇪🇪" },
    { code: "FI", dial: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "FR", dial: "+33", name: "France", flag: "🇫🇷" },
    { code: "DE", dial: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "GR", dial: "+30", name: "Greece", flag: "🇬🇷" },
    { code: "HK", dial: "+852", name: "Hong Kong", flag: "🇭🇰" },
    { code: "HU", dial: "+36", name: "Hungary", flag: "🇭🇺" },
    { code: "IS", dial: "+354", name: "Iceland", flag: "🇮🇸" },
    { code: "IN", dial: "+91", name: "India", flag: "🇮🇳" },
    { code: "ID", dial: "+62", name: "Indonesia", flag: "🇮🇩" },
    { code: "IR", dial: "+98", name: "Iran", flag: "🇮🇷" },
    { code: "IQ", dial: "+964", name: "Iraq", flag: "🇮🇶" },
    { code: "IE", dial: "+353", name: "Ireland", flag: "🇮🇪" },
    { code: "IL", dial: "+972", name: "Israel", flag: "🇮🇱" },
    { code: "IT", dial: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "JP", dial: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "JO", dial: "+962", name: "Jordan", flag: "🇯🇴" },
    { code: "KE", dial: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "KW", dial: "+965", name: "Kuwait", flag: "🇰🇼" },
    { code: "MY", dial: "+60", name: "Malaysia", flag: "🇲🇾" },
    { code: "MV", dial: "+960", name: "Maldives", flag: "🇲🇻" },
    { code: "MX", dial: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "MM", dial: "+95", name: "Myanmar", flag: "🇲🇲" },
    { code: "NP", dial: "+977", name: "Nepal", flag: "🇳🇵" },
    { code: "NL", dial: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "NZ", dial: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "NG", dial: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "NO", dial: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "OM", dial: "+968", name: "Oman", flag: "🇴🇲" },
    { code: "PK", dial: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "PH", dial: "+63", name: "Philippines", flag: "🇵🇭" },
    { code: "PL", dial: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "PT", dial: "+351", name: "Portugal", flag: "🇵🇹" },
    { code: "QA", dial: "+974", name: "Qatar", flag: "🇶🇦" },
    { code: "RO", dial: "+40", name: "Romania", flag: "🇷🇴" },
    { code: "RU", dial: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "SA", dial: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "ZA", dial: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "KR", dial: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "ES", dial: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "LK", dial: "+94", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "SE", dial: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "CH", dial: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "TH", dial: "+66", name: "Thailand", flag: "🇹🇭" },
    { code: "TR", dial: "+90", name: "Turkey", flag: "🇹🇷" },
    { code: "UA", dial: "+380", name: "Ukraine", flag: "🇺🇦" },
    { code: "AE", dial: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "US", dial: "+1", name: "United States", flag: "🇺🇸" },
    { code: "VN", dial: "+84", name: "Vietnam", flag: "🇻🇳" }
  ];

  // DEFAULT → India (+91)
  const selected =
    countryCodes.find((c) => c.dial === value) ||
    countryCodes.find((c) => c.code === "IN");
    
    const handleSelect = (c) => {
        // ✅ Simulate an event object for parent
        onChange({ target: { name, value: c.dial } });
        setOpen(false);
      };
  return (
    <div className="dropdown-container" style={{ position: "relative" }}>
      <div
        className="dropdown-selected tel-contact"
        onClick={() => setOpen(!open)}
        // style={{
        //   border: "1px solid #ccc",
        //   padding: "6px 10px",
        //   width: "90px",
        //   cursor: "pointer",
        //   display: "flex",
        //   alignItems: "center",
        //   gap: "8px",
        //   borderRadius: "6px",
        //   background: "#fff",
        //   height:'35px'
        // }}
      >
        {/* Render only if selected exists */}
        {selected && (
          <img
            src={`https://flagcdn.com/24x18/${selected.code.toLowerCase()}.png`}
            width="24"
            height="18"
          />
        )}
        <span>{selected?.dial}</span>
      </div>

      {open && (
        <div
          className="dropdown-list"
          style={{
            position: "absolute",
            top: "45px",
            left: 0,
            width: "100px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            zIndex: 50,
            maxHeight: "250px",
            overflowY: "auto"
          }}
        >
          {countryCodes.map((c, i) => (
            <div
              key={i}
              onClick={() => handleSelect(c)}
              style={{
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              }}
            >
              <img
                src={`https://flagcdn.com/24x18/${c.code.toLowerCase()}.png`}
                width="24"
                height="18"
              />
              <span>{c.dial}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

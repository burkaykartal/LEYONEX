import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Text,
	Section,
	Hr,
} from "@react-email/components";

interface QuoteRequestEmailProps {
	companyName: string;
	contactPerson: string;
	email: string;
	phone: string;
	fairName: string;
	country: string;
	date: string;
	services: {
		[key: string]: any;
	};
}

export default function QuoteRequestEmail({
	companyName,
	contactPerson,
	email,
	phone,
	fairName,
	country,
	date,
	services,
}: QuoteRequestEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Yeni Teklif Talebi - {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>Yeni Teklif Talebi</Heading>

					<Section>
						<Heading style={h2}>Firma Bilgileri</Heading>
						<Text style={text}>
							<strong>Firma:</strong> {companyName}
						</Text>
						<Text style={text}>
							<strong>İlgili Kişi:</strong> {contactPerson}
						</Text>
						<Text style={text}>
							<strong>E-posta:</strong> {email}
						</Text>
						<Text style={text}>
							<strong>Telefon:</strong> {phone}
						</Text>
					</Section>

					<Hr style={hr} />

					<Section>
						<Heading style={h2}>Fuar Bilgileri</Heading>
						<Text style={text}>
							<strong>Fuar Adı:</strong> {fairName}
						</Text>
						<Text style={text}>
							<strong>Ülke:</strong> {country}
						</Text>
						<Text style={text}>
							<strong>Tarih:</strong> {date}
						</Text>
					</Section>

					<Hr style={hr} />

					<Section>
						<Heading style={h2}>Talep Edilen Hizmetler</Heading>
						{Object.entries(services).map(
							([key, value]) =>
								value && (
									<div key={key}>
										<Text style={serviceTitle}>{key}</Text>
										<Text style={text}>
											{JSON.stringify(value, null, 2)}
										</Text>
									</div>
								)
						)}
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: "Montserrat, sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "40px 20px",
	maxWidth: "600px",
};

const h1 = {
	color: "#8b5cf6",
	fontSize: "28px",
	fontWeight: "bold",
	marginBottom: "30px",
};

const h2 = {
	color: "#ec4899",
	fontSize: "20px",
	fontWeight: "600",
	marginBottom: "15px",
};

const text = {
	color: "#374151",
	fontSize: "14px",
	lineHeight: "24px",
};

const serviceTitle = {
	color: "#8b5cf6",
	fontSize: "16px",
	fontWeight: "600",
	marginTop: "10px",
};

const hr = {
	borderColor: "#e5e7eb",
	margin: "20px 0",
};


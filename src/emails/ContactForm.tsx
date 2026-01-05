import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Text,
	Section,
} from "@react-email/components";

interface ContactFormEmailProps {
	name: string;
	email: string;
	phone: string;
	message: string;
}

export default function ContactFormEmail({
	name,
	email,
	phone,
	message,
}: ContactFormEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Yeni İletişim Formu Mesajı - {name}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>Yeni İletişim Formu Mesajı</Heading>

					<Section style={section}>
						<Text style={label}>Ad Soyad:</Text>
						<Text style={value}>{name}</Text>
					</Section>

					<Section style={section}>
						<Text style={label}>E-posta:</Text>
						<Text style={value}>{email}</Text>
					</Section>

					<Section style={section}>
						<Text style={label}>Telefon:</Text>
						<Text style={value}>{phone || "Belirtilmemiş"}</Text>
					</Section>

					<Section style={section}>
						<Text style={label}>Mesaj:</Text>
						<Text style={value}>{message}</Text>
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
	borderRadius: "8px",
};

const h1 = {
	color: "#8b5cf6",
	fontSize: "24px",
	fontWeight: "bold",
	marginBottom: "20px",
};

const section = {
	marginBottom: "20px",
};

const label = {
	color: "#6b7280",
	fontSize: "14px",
	marginBottom: "4px",
	fontWeight: "600",
};

const value = {
	color: "#111827",
	fontSize: "16px",
	margin: "0",
};


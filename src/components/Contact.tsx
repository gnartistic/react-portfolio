import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const ContactPage = ({ activeTheme }: { activeTheme: any }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { firstName: "", lastName: "", email: "", phone: "", message: "" };

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
      valid = false;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    if (formData.message.trim() === "") {
      newErrors.message = "Message cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && formRef.current) {
      emailjs
        .sendForm(
          'gn4rtistic', 'template_i6x8ryc', 
          formRef.current,
          '4_qmxz9FGpsLgzJvV'
        )
        .then(
          () => {
            toast({
              title: "Message sent successfully!",
              description: "I'll get back to you shortly.",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: "",
            });
          },
          () => {
            toast({
              title: "Failed to send the message.",
              description: "Please try again later.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        );
    } else {
      toast({
        title: "Form submission failed.",
        description: "Please check the highlighted fields and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex bg={activeTheme.accent} color={activeTheme.background} flexDirection="column" alignItems="center" minHeight="100vh" width="100%" p={10} pt={{ base: "100px", lg: "200px" }}>
      <Flex flexDirection="column" width="90%">
        <Text fontSize="3xl" fontWeight="bold" mb={{ base: 3, lg: 10 }}>
          Contact Me
        </Text>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Flex flexDirection="column" maxWidth="600px" mx="auto" gap={{ base: 2, lg: 6 }}>
            <Box>
              <Text mb={2}>First Name</Text>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                borderColor={activeTheme.background}
              />
              {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
            </Box>

            <Box>
              <Text mb={2}>Last Name</Text>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                borderColor={activeTheme.background}
              />
              {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
            </Box>

            <Box>
              <Text mb={2}>Email</Text>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                borderColor={activeTheme.background}
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}
            </Box>

            <Box>
              <Text mb={2}>Phone Number</Text>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                borderColor={activeTheme.background}
              />
              {errors.phone && <Text color="red.500">{errors.phone}</Text>}
            </Box>

            <Box>
              <Text mb={2}>Message</Text>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                borderColor={activeTheme.background}
              />
              {errors.message && <Text color="red.500">{errors.message}</Text>}
            </Box>

            <Button
              type="submit"
              bg={activeTheme.background}
              color={activeTheme.primary}
              _hover={{ bg: `${activeTheme.accent}`, color: `${activeTheme.background}` }}
              fontSize="lg"
              px={10}
              py={6}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default ContactPage;
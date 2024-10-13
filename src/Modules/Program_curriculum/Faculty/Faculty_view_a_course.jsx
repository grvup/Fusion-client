import React, { useState } from "react";
import {
  Button,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Grid,
  Group,
} from "@mantine/core";

function CourseForm() {
  // Temporary data variable for form inputs
  const [formData] = useState({
    courseName: "Discrete Mathematics",
    courseCode: "NS205c",
    credit: 4,
    version: "1.0",
    lecture: 3,
    tutorial: 0,
    practical: 2,
    discussion: 0,
    project: 0,
    workingCourse: "Yes",
    discipline: "Computer Science",
    prerequisites: "NIL",
    prerequisiteCourse: "None",
    syllabus: `Preliminaries: Sets, relations, partial ordering, total orders, equivalence relations, functions and sequences.
    Logic and proofs: propositional logic and equivalences, predicates, quantifiers, rules of inference, proof methods, mathematical induction.
    Number Theory: Division algorithm, Euclid’s algorithm, fundamental theorem of arithmetic, Chinese remainder theorem.
    Basics of Combinatorics: Counting principles, Permutations, combinations, generalized permutations and combinations, recurrence relations and generating function.
    Algebra: Groups and normal subgroups, homomorphisms and isomorphism, rings, integral domains, fields, lattices and Boolean Algebra.
    Graphs: Graph representations, special types of graphs, graph isomorphism, connectivity, Euler and Hamiltonian paths, planar graphs, graph coloring.
    Probability and Statistics: Basic probability, conditional probability, random variables, probability distribution, variance, central limit theorem, confidence interval and hypothesis testing.`,
    references: `Text/Reference books: 
    1. K. H. Rosen, Discrete Mathematics and Its Applications, 6th Edition / International Students Edition, Tata McGraw Hill, 2007.
    2. C.L. Liu, Elements of Discrete Mathematics, 2nd Edition, Tata McGraw Hill, 2000.
    3. L. Lovász, J. Pelikán, K. Vesztergombi, Discrete Mathematics: Elementary and Beyond (Undergraduate Texts in Mathematics), Springer, 2003.
    4. S.M. Ross, Introduction to Probability and Statistics for Engineers and Scientists, Elsevier, 2014.`,
    quiz1: 5,
    midsem: 20,
    quiz2: 5,
    endsem: 40,
    projectEval: 10,
    lab: 10,
    attendance: 10,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  // Inline styling to match the appearance in the image
  const formStyles = {
    backgroundColor: "#f0f8ff",
    border: "2px solid #add8e6",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    color: "#0047ab",
  };

  const inputFieldStyles = {
    marginBottom: "15px",
  };

  const headingStyles = {
    color: "#0047ab",
    fontSize: "18px",
    marginBottom: "10px",
  };

  return (
    <form style={formStyles} onSubmit={handleSubmit}>
      {/* Dynamically generate heading using course code, name, and version */}
      <h2 style={titleStyles}>
        {`${formData.courseCode} - ${formData.courseName} - v(${formData.version})`}
      </h2>

      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="Course Name"
            value={formData.courseName}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            label="Course Code"
            value={formData.courseCode}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <NumberInput
            label="Credit"
            value={formData.credit}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <TextInput
            label="Version"
            value={formData.version}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <h3 style={headingStyles}>Contact Hours</h3>
        </Grid.Col>

        <Grid.Col span={2}>
          <NumberInput
            label="Lecture"
            value={formData.lecture}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            label="Tutorial"
            value={formData.tutorial}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            label="Practical"
            value={formData.practical}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            label="Discussion (GD)"
            value={formData.discussion}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            label="Project"
            value={formData.project}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Select
            label="Working Course"
            data={["Yes"]}
            value={formData.workingCourse}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Select
            label="From Discipline(s)"
            data={["Computer Science"]}
            value={formData.discipline}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            label="Pre-requisites"
            value={formData.prerequisites}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Select
            label="Pre-requisites Courses"
            data={["None"]}
            value={formData.prerequisiteCourse}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea
            label="Syllabus"
            value={formData.syllabus}
            readOnly
            autosize
            minRows={6}
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea
            label="Reference & Books"
            value={formData.references}
            readOnly
            autosize
            minRows={3}
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <h3 style={headingStyles}>Evaluation Criteria</h3>
        </Grid.Col>

        <Grid.Col span={1}>
          <NumberInput
            label="Quiz 1"
            value={formData.quiz1}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Midsem"
            value={formData.midsem}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Quiz 2"
            value={formData.quiz2}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Endsem"
            value={formData.endsem}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Project"
            value={formData.projectEval}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Lab"
            value={formData.lab}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Attendance"
            value={formData.attendance}
            readOnly
            style={inputFieldStyles}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Group position="right">
            {/* <Button variant="default" color="green" onClick={() => console.log('Add Course Clicked')}>
              Add Course
            </Button> */}
            <Button type="submit" color="blue">
              Edit Course
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default CourseForm;

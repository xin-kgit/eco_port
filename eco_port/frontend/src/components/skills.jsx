function Skills() {
    const skills = [
        'Python',
        'JavaScript',
        'React',
        'FastAPI',
        'SQL',
        'Machine Learning',
        'DSA',
        'Git'
    ]

    return (
        <section id="skills" className="skills">
            <p className="section-tag">02 - SKILLS</p>

            <h2>What I work with</h2>

            <div className="skills-grid">
                {skills.map((skill) => (
                    <div className="skill-card" key={skill}>
                        {skill}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills 
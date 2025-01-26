import Link from "next/link";

async function getAllTeamMembers() {
    const MembersPromise = await fetch("http://localhost:1337/api/team-members")
    const members = await MembersPromise.json()
    return members.data
}

export default async function Page() {
    const members = await getAllTeamMembers()

    return(
        <div>
            <h1>Our Team</h1>
            <div>
                {members.map(member => {
                    return <div>
                        <Link href={`/our-team/${member.slug}`} > {member.name}</Link>
                    </div>

                })}

            </div>
        </div>
    )
}
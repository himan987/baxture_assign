import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import { Card, Image, Text, Button, Group } from "@mantine/core";
import "./mycards.css";
import {
  IconAt,
  IconWorld,
  IconPhoneCall,
  IconUserPlus,
  IconUserMinus,
  IconTrash,
  IconStar,
} from "@tabler/icons-react";

const MyCard = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          item.followed = false;
        });
        setUsers(data);
      });
  }, []);

  const handleFollow = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return (
    <div>
      <Grid className="m10">
        {users.map((user) => {
          return (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section className="container">
                  <Image
                    src={
                      "https://api.dicebear.com/7.x/initials/svg?seed=" +
                      user.name
                    }
                    alt="Norway"
                    className="img"
                  />
                </Card.Section>
                <Group justify="center" mt="md" mb="xs">
                  <Text fw={500}>{user.name}</Text>
                  {user.followed && <IconStar size={17} />}
                </Group>
                <Text>
                  <Text
                    size="md"
                    c="dimmed"
                    mb={10}
                    className="hover-underline:hover hover-underline"
                  >
                    <IconAt size={17} className="mr10" /> {user.email}
                  </Text>
                  <Text
                    size="md"
                    c="dimmed"
                    mb={10}
                    className="hover-underline:hover hover-underline"
                  >
                    <IconPhoneCall size={17} className="mr10" />
                    {user.phone}
                  </Text>
                  <Text
                    size="md"
                    c="dimmed"
                    mb={10}
                    className="hover-underline:hover hover-underline"
                  >
                    <IconWorld size={17} className="mr10" />
                    {user.website}
                  </Text>
                </Text>
                <Group justify="center">
                  <Button
                    variant={user?.followed ? "outline" : "filled"}
                    size="compact-sm"
                    w={120}
                    h={35}
                    leftSection={
                      user?.followed ? (
                        <IconUserMinus size={17} />
                      ) : (
                        <IconUserPlus size={17} />
                      )
                    }
                    onClick={() => handleFollow(user.id)}
                  >
                    {user?.followed ? "Unfollow" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    size="compact-sm"
                    w={120}
                    h={35}
                    leftSection={<IconTrash size={17} />}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default MyCard;
